## 1. Big Data Tech Stack (Luồng giá trị dữ liệu)

Dữ liệu chảy từ dưới lên trên, được bao bọc bởi **Management, Privacy, Security & Governance** để đảm bảo dữ liệu "sạch", an toàn và đúng pháp luật trước khi tạo ra giá trị (**Value**).

* **Big Data Management (Data Centers & Scalable Data Storage):**
* Đây là lớp **Infrastructure** (Hạ tầng). Trước khi nói về thuật toán, bạn cần nơi để chứa dữ liệu khổng lồ. Các **Data centers** cung cấp tài nguyên vật lý (Server, Network, UPS).
* **Scalable Data Storage** (như HDFS, S3) cho phép bạn mở rộng không gian lưu trữ gần như vô hạn bằng cách thêm máy tính mới vào cụm (cluster).


* **Big Data Platform (Hadoop Ecosystem - Data Ingestion & Processing):**
* Lớp này giải quyết việc "đưa dữ liệu vào" (**Ingestion** - Kafka, Flume) và "xử lý dữ liệu" (**Processing** - Spark, MapReduce).
* Hệ sinh thái Hadoop đóng vai trò là bộ khung (framework) để điều phối việc tính toán phân tán trên các luồng dữ liệu này.


* **Big Data Analytics (Data Science - Transform question to algo):**
* Sau khi có dữ liệu sạch từ Platform, các Data Scientist sẽ dùng toán học, thống kê để chuyển đổi các câu hỏi nghiệp vụ thành **Algorithm** (thuật toán). Đây là nơi các mô hình Machine Learning/AI được xây dựng.


* **Big Data Utilization (Domain Expertise - Asking the right question):**
* Đây là lớp cao nhất. Công nghệ mạnh đến đâu cũng vô dụng nếu không có **Domain expertise** (kiến thức ngành). Chuyên gia trong ngành (Tài chính, Y tế, Sản xuất) phải biết **đặt câu hỏi đúng** để Analytics có mục tiêu rõ ràng, từ đó mới tạo ra **Value**.

---

## 2. Scalable Data Management (Các đặc tính hệ thống phân tán)

Khi bạn quản lý dữ liệu ở quy mô lớn (Scalable), hệ thống không còn là một chiếc máy đơn lẻ mà là một cụm máy tính phức tạp.

* **Scalability (Tính mở rộng):** Khả năng hệ thống xử lý lượng công việc tăng lên bằng cách thêm tài nguyên.
* *Scale-up (Vertical):* Tăng sức mạnh (RAM/CPU) cho một máy.
* *Scale-out (Horizontal):* Thêm nhiều máy rẻ tiền vào hệ thống (Đây là thế mạnh của Big Data).


* **Accessibility (Tính truy cập):** * Bạn đang băn khoăn về **Băng thông (Bandwidth)**? Đúng vậy. Trong Big Data, việc di chuyển dữ liệu lớn qua mạng (Network) rất tốn kém và chậm.
* *Giải pháp:* Thường dùng nguyên lý **Data Locality** (đưa tính toán đến nơi đặt dữ liệu, thay vì kéo dữ liệu về nơi tính toán) để giảm áp lực lên băng thông.


* **Transparency (Tính trong suốt):** * Dù hệ thống có 1000 máy chủ chạy ngầm, người dùng hoặc lập trình viên chỉ cần tương tác qua một điểm duy nhất (như một Interface/Endpoint) như thể đang dùng 1 máy. Hệ thống phân tán phải tự lo việc điều phối bên dưới.
* **Availability (Tính sẵn sàng) & Fault Tolerance:** * **Availability** trả lời câu hỏi: "Tại thời điểm t, tôi truy cập hệ thống có phản hồi không?".
* Để có Availability cao trong Big Data, bạn cần **Fault tolerance** (Khả năng chịu lỗi). Vì trong một cụm 1000 máy, chắc chắn sẽ có vài máy hỏng mỗi ngày. Hệ thống phải có cơ chế tự sao lưu dữ liệu (Replication) để khi máy A hỏng, máy B sẽ thay thế ngay lập tức mà không gây gián đoạn.

---

## 3. Scalable Data Ingestion and processing

* **Data Ingestion:** Là quá trình thu thập và vận chuyển dữ liệu từ các nguồn (Sources) về hệ thống lưu trữ tập trung.
* *Batch Ingestion:* Thu thập theo lô (ví dụ: Sqoop kéo dữ liệu từ RDBMS).
* *Real-time Ingestion:* Thu thập theo thời gian thực (ví dụ: Kafka, Flume).


* **Data Processing:**
* **Hướng xử lý song song truyền thống:**
* **OpenMP:** Chia nhỏ công việc dựa trên **Shared Memory** (bộ nhớ dùng chung) trên một máy đa nhân.
* **MPI (Message Passing Interface):** Chạy trên nhiều máy nhưng đòi hỏi lập trình viên phải tự quản lý việc trao đổi dữ liệu giữa các node và tự xử lý lỗi (**Manual Fault Tolerance**). Rất khó lập trình khi quy mô lên tới hàng nghìn node.


* **Hướng tiếp cận hiện đại:** Sự ra đời của **Hadoop (MapReduce)** và **Spark**.
* *Nguyên lý:* Dựa trên mô hình **Data Parallelism** và cơ chế tự động hóa việc phân phối, chịu lỗi.
* **Commodity Hardware:** Có thể chạy trên các máy tính cấu hình phổ thông, rẻ tiền ghép lại thành Cluster thay vì cần siêu máy tính (Supercomputers).





---

## 4. Scalable analytic algorithms (Các giải thuật phân tích dữ liệu khả mở)

* **Challenges:**
* **Big Volume:** Dữ liệu quá lớn không thể nạp vừa vào RAM của một máy đơn lẻ.
* **Big Dimensionality:** "Lời nguyền chiều dữ liệu" (Curse of Dimensionality) làm tăng độ phức tạp tính toán theo hàm mũ.
* **Real-time Processing:** Yêu cầu độ trễ cực thấp. Các bài toán **Deep Learning (DL)** khó hơn ML truyền thống vì cấu trúc mạng nơ-ron có sự phụ thuộc lẫn nhau giữa các lớp, khó chia tách để tính toán song song hoàn toàn.


* **Chiến lược giải quyết:**
* **Làm nhỏ lại dữ liệu (Data Reduction):** Giảm kích thước dữ liệu nhưng vẫn giữ lại thông tin cốt lõi.
* *Sub-sampling:* Lấy mẫu đại diện.
* *Principal Component Analysis (PCA):* Giảm số chiều dữ liệu (Dimensionality Reduction).
* *Feature Extraction & Selection:* Chỉ giữ lại những đặc trưng quan trọng nhất cho mô hình.


* **Song song hoá các giải thuật học máy (Parallelization):**
* *k-NN based on MapReduce:* Chia nhỏ tập dữ liệu để tính toán khoảng cách (distance) song song trên nhiều node.
* *Scaling-up SVM by Divide-and-conquer:* Chia bài toán tối ưu hóa của SVM thành các bài toán con nhỏ hơn, giải quyết độc lập rồi kết hợp lại.

---

## 5. Privacy and security

Trong Big Data, lớp này không chỉ là tường lửa mà còn là quản trị dữ liệu (**Data Governance**):

* **Privacy (Tính riêng tư):** * Sử dụng các kỹ thuật như **Anonymization** (ẩn danh hóa) hoặc **Data Masking** để bảo vệ thông tin cá nhân (PII - Personally Identifiable Information).
* **Differential Privacy:** Thêm nhiễu vào dữ liệu để kết quả phân tích vẫn đúng nhưng không thể truy ngược lại từng cá nhân.


* **Security (An ninh):**
* **Authentication & Authorization:** Xác thực người dùng (ai được vào hệ thống) và phân quyền (được xem dữ liệu gì) - ví dụ dùng **Kerberos** hoặc **Apache Ranger**.
* **Encryption:** Mã hóa dữ liệu cả khi đang lưu trữ (**At rest**) và khi đang truyền trên mạng (**In transit**).
* **Audit Logging:** Ghi lại toàn bộ vết truy cập để kiểm soát khi có sự cố rò rỉ dữ liệu.

---

