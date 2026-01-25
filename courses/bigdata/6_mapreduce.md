Việc **MapReduce** lựa chọn ghi dữ liệu xuống **Disk** (ổ cứng) thay vì lưu trữ trên **RAM** giữa các giai đoạn xử lý là một quyết định mang tính kiến trúc, gắn liền với thời điểm nó ra đời và mục tiêu thiết kế ban đầu của Google.

Dưới đây là các lý do chính:

### 1. Chi phí và Dung lượng (Cost & Scale)

Vào thời điểm MapReduce được thiết kế (đầu những năm 2000), RAM là một tài nguyên cực kỳ đắt đỏ và có dung lượng rất hạn chế so với Disk.

* **Dung lượng:** MapReduce được thiết kế để xử lý hàng Petabyte dữ liệu. Việc nạp toàn bộ lượng dữ liệu này vào RAM của một cụm máy chủ lúc bấy giờ là điều không khả thi về mặt kinh tế.
* **Disk là vô tận:** Ổ cứng rẻ hơn hàng trăm lần và có dung lượng lớn hơn nhiều, cho phép xử lý các tập dữ liệu khổng lồ mà không lo bị tràn bộ nhớ (Out of Memory).

### 2. Khả năng chịu lỗi (Fault Tolerance)

MapReduce ưu tiên tính bền vững của dữ liệu hơn là tốc độ nhất thời.

* **Check-pointing:** Khi giai đoạn Map hoàn tất, kết quả trung gian được ghi xuống Disk. Nếu máy chủ chạy Reduce bị hỏng, hệ thống không cần chạy lại toàn bộ quá trình Map mà chỉ cần đọc lại kết quả đã lưu trên Disk của các node khác.
* **Bền vững (Durability):** Dữ liệu trên RAM sẽ mất sạch nếu máy chủ bị mất điện hoặc sập hệ điều hành. Việc ghi xuống Disk đảm bảo dữ liệu "sống sót" qua các sự cố phần cứng thường xuyên xảy ra trong các cụm máy tính lớn.

### 3. Cơ chế Shuffle và Sort (Tầng trung gian)

Giữa bước Map và Reduce có một giai đoạn cực kỳ tốn tài nguyên là **Shuffle & Sort**.

* Dữ liệu từ rất nhiều máy Map phải được gom nhóm và sắp xếp lại trước khi chuyển sang các máy Reduce.
* Việc thực hiện sắp xếp (Sorting) trên một lượng dữ liệu trung gian có kích thước lớn hơn tổng dung lượng RAM của hệ thống buộc MapReduce phải sử dụng cơ chế **External Sort** (sắp xếp trên đĩa).

### 4. Quản lý tài nguyên đơn giản

* Lưu trữ trên Disk giúp việc quản lý bộ nhớ đơn giản hơn. Framework không cần phải quản lý các cấu trúc dữ liệu phức tạp trong RAM để tránh phân mảnh hay tranh chấp bộ nhớ giữa các tiến trình khác nhau.
* Nó cho phép hệ điều hành tận dụng cơ chế **Buffer Cache** để tối ưu hóa việc đọc/ghi mà không cần can thiệp quá sâu từ tầng ứng dụng.

---

Chào bạn, việc luyện tập qua câu hỏi phản xạ là cách rất tốt để nắm vững kiến trúc MapReduce cho môn Big Data. Dưới đây là 10 câu hỏi thử thách kiến thức của bạn, đi từ cơ bản đến nâng cao.

---

## PHẦN 1: 10 CÂU HỎI KIỂM TRA

1. **Mục tiêu chính:** Tại sao MapReduce lại chọn mô hình "di chuyển tính toán đến dữ liệu" (Moving computation to data) thay vì ngược lại?
2. **Input Split:** Sự khác biệt giữa **Input Split** và **HDFS Block** là gì? Hai khái niệm này có mối quan hệ như thế nào?
3. **Hàm Map:** Đầu vào và đầu ra của hàm Map (về mặt kiểu dữ liệu ) là gì?
4. **Shuffle & Sort:** Giai đoạn này nằm ở đâu trong quy trình xử lý và vai trò quan trọng nhất của nó là gì?
5. **Hàm Reduce:** Tại sao hàm Reduce lại nhận đầu vào là một Key kèm theo một **List of Values** () thay vì chỉ là một cặp  đơn lẻ?
6. **I/O Disk:** Tại sao kết quả trung gian của các Map Task lại được ghi xuống đĩa cứng (Local Disk) thay vì lưu trên HDFS hay RAM?
7. **Data Locality:** Giải thích 3 mức độ của Data Locality trong MapReduce (Node local, Rack local, Off-switch).
8. **Speculative Execution:** Đây là cơ chế gì và nó giải quyết vấn đề "Straggler" (máy chạy chậm) như thế nào?
9. **Fault Tolerance:** Nếu một node chạy Map Task bị hỏng giữa chừng, MapReduce Framework sẽ làm gì để đảm bảo chương trình không bị chết?
10. **Hạn chế:** Tại sao MapReduce không phù hợp cho các thuật toán lặp (Iterative Algorithms) như K-Means hay các bài toán Machine Learning so với Spark?

---

## PHẦN 2: ĐÁP ÁN CHI TIẾT

1. **Đáp án:** Trong Big Data, dung lượng dữ liệu quá lớn (hàng TB/PB). Việc di chuyển dữ liệu qua mạng sẽ gây nghẽn băng thông và tốn rất nhiều thời gian. Di chuyển các gói code (chỉ vài KB) đến máy đang chứa dữ liệu đó sẽ giúp xử lý tại chỗ, tối ưu hóa Network I/O.
2. **Đáp án:** HDFS Block là cách chia dữ liệu **vật lý** trên ổ đĩa (thường là 128MB). Input Split là cách chia dữ liệu **logic** để MapReduce hiểu. Thông thường, 1 Input Split tương ứng với 1 HDFS Block để đảm bảo tính cục bộ (Data Locality).
3. **Đáp án:** Đầu vào là một cặp  (ví dụ: số thứ tự dòng, nội dung dòng). Đầu ra là danh sách các cặp trung gian .
4. **Đáp án:** Nằm giữa Map và Reduce. Vai trò của nó là thu thập tất cả các giá trị trung gian có **cùng một Key** từ tất cả các máy Map để đưa về cùng một máy Reduce duy nhất, đồng thời sắp xếp chúng theo thứ tự Key.
5. **Đáp án:** Vì sau giai đoạn Shuffle, tất cả dữ liệu có chung một Key đã được gom lại. Để thực hiện các phép tính tổng hợp (như tính tổng, trung bình, đếm), hàm Reduce cần nhìn thấy toàn bộ tập hợp các giá trị liên quan đến Key đó.
6. **Đáp án:** Để tiết kiệm tài nguyên. Ghi xuống Local Disk giúp giải phóng RAM cho các tác vụ khác. Không ghi lên HDFS vì đây chỉ là dữ liệu tạm thời, ghi lên HDFS (có replication) sẽ tốn rất nhiều băng thông mạng không cần thiết.
7. **Đáp án:**
* **Node local:** Task chạy ngay trên máy chứa dữ liệu (Tốt nhất).
* **Rack local:** Task chạy trên máy khác nhưng cùng một tủ Rack (Tốt nhì).
* **Off-switch:** Task chạy trên máy ở Rack khác (Chậm nhất do qua nhiều Switch).


8. **Đáp án:** Khi thấy một Task chạy quá chậm so với trung bình, Framework sẽ khởi động một bản sao của Task đó trên một máy khác. Bản nào xong trước sẽ được lấy kết quả, bản còn lại sẽ bị hủy. Việc này giúp tránh một máy lỗi làm chậm toàn bộ Job.
9. **Đáp án:** Framework sẽ tự động lập lịch lại (Re-schedule) các Task bị lỗi đó sang các node khác còn sống. Vì kết quả Map được lưu trên đĩa, nếu máy đó chết hoàn toàn, Framework sẽ chạy lại các Map Task tương ứng từ dữ liệu gốc trên HDFS.
10. **Đáp án:** Vì MapReduce luôn ghi kết quả xuống Disk sau mỗi bước. Các thuật toán lặp cần đọc/ghi dữ liệu liên tục, việc I/O Disk quá nhiều tạo ra độ trễ cực lớn. Spark giải quyết bằng cách giữ dữ liệu trên RAM giữa các bước lặp.

Hy vọng bộ câu hỏi này giúp bạn tự tin hơn cho kỳ thi hoặc buổi thuyết trình Big Data sắp tới! Bạn có muốn mình giải thích sâu hơn về cơ chế **Combiner** - một bước tối ưu nằm giữa Map và Shuffle không?