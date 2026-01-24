## Outline 
- Apache Hadoop
- Hệ thống tệp tin Hadoop (HDFS)
- Mô thức xử lý dữ liệu MapReduce
- Các thành phần khác trong hệ sinh thái Hadoop

## Apache Hadoop
* Mục tiêu của Hadoop 
- Mục tiêu chính 
  + Lưu trữ dữ liệu khả mở, tin cậy
  + Xử lý dữ liệu cao 
- Thách thức
  + Làm sao để kết nối nhiều mkáy tính thiếu tin cậy, trên phần cứng phổ thông để có thể lập trình song song được? 

* Các thành phần chính của Hadoop
- Lưu trữ dữ liệu: HDFS
- Xử lý dữ liệu: MapReduce framework 
- Các tiện ích hệ thống: 
  + Hadoop Common
  + Hadoop YARN
Hadoop viết bằng java -> Nhiều máy dùng hđh kahsc nhau (vd windows,linux) nhưng khi chạy đều qua JVM 

* Hadoop giải quyết bài toán khả mở
- Thiết kế hướng phân tấn ngay từ đầu -> mặc định thiết kế để triển khai trên các cụm máy chủ
- Mỗi node tham gia vào cả 2 vai trò lưu trữ và tính toán
- Mở rộng bằng scale-out
Sử dụng cơ chế heartbeat

* Hadoop giải quyết bài toán chịu lỗi
- Chịu lỗi thông qua kỹ thuật "dư thùa" bằng cách replicate 
- Tệp tin phân mảnh, nhân bản ra các nodes trong cụm
- Công việc xử lý dữ liệu cũng được phân mảnh thành các tác vụ độc lập -> xử lý song song, tác vụ lỗi lập lịch thực thi trên node khác
=> Hadoop được thiết kế sao cho lỗi xảy ra được hệ thống xử lý tự động, không ảnh hưởng tới các ứng dụng phía trên

## Hệ thống tệp tin Hadoop (HDFS)
* Tổng quan về HDFS
- Lưu trữ tin cậy, chi phí hợp lý cho khối lượng dữ liệu lớn
- Tối ưu cho các tập tin kích thước lớn. Why? 
  + Trong các hệ điều hành thông thường (như Windows hay Linux), kích thước block chỉ khoảng 4KB. Tuy nhiên, trong HDFS, kích thước block mặc định lớn, thường là 64MB.
  + NameNode là thành phần quản lý sơ đồ phân bổ các block (metadata). Mọi thông tin về file, thư mục và vị trí các block đều được lưu trữ trong RAM của NameNode để đảm bảo tốc độ truy cập.
  Vấn đề với tệp nhỏ: Mỗi tệp hoặc block chiếm khoảng 150 bytes trong bộ nhớ của NameNode. Nếu bạn có 1 triệu tệp 1KB, NameNode sẽ bị quá tải bộ nhớ. Ưu thế tệp lớn: Một tệp 1TB chia thành các block 128MB sẽ chiếm rất ít mục nhập trong RAM của NameNode, cho phép hệ thống quản lý hàng petabyte dữ liệu mà không làm sập bộ xử lý trung tâm.
  + HDFS không được thiết kế cho việc truy cập ngẫu nhiên (random access) mà tối ưu cho việc đọc tuần tự. Việc đọc một tệp lớn theo kiểu dòng chảy (streaming) giúp các framework như Spark hay MapReduce xử lý dữ liệu song song cực nhanh trên các DataNode mà không bị ngắt quãng bởi việc tìm kiếm file liên tục.
- Có không gian cây thư mục phân cấp như UNIX, có cơ chế phân quyền và kiểm soát người dùng như của UNIX. Khác biệt: Chỉ hỗ trợ thêm dữ liệu vào cuối tệp -> ghi một lần và đọc nhiều lần

* Kiến trúc của HDFS
- Kiến trúc Master/Slave
- HDFS master: name node
	+ Quản lý không gian tên, Lưu trữ metadata (dữ liệu mô tả dữ liệu khác) ánh xạ tệp tin tới vị trí các chunks 
	+ Giám sát data node
- HDFS slave: data node 
	+ Trực tiếp thao tác I/O các chunks. Tức là client ban đầu sẽ lấy dữ liệu vị trí từ namenode, sau đó sẽ truy vấn trực tiếp dữ liệu từ thông tin được cung cấp đó với data node 

* Nguyên lý thiết kế cốt lõi của HDFS 
- I/O Pattern -> aappend only, giảm tương tranh
- Phân tán dữ liệu -> chia thành các chunks lớn (64MB)
- Nhân bản dữ liệu -> 3 nhân bản
- Cơ chế chịu lỗi 
	+ Data node: Nhân bản
	+ Namenode: Sử dụng Secondary Name node. Secondary NameNode được triển khai để thực hiện cơ chế Checkpointing nhằm duy trì bản sao mới nhất của hệ thống tệp tin. Quá trình này bắt đầu bằng việc Secondary NameNode sao chép file FsImage và các file nhật ký giao dịch (Transaction Log/EditLog) từ NameNode chính về một thư mục tạm thời của nó. Tại đây, Secondary NameNode tiến hành hợp nhất FsImage và Transaction Log thành một file FsImage mới có nội dung cập nhật, sau đó tải file FsImage mới này lên lại NameNode chính. Ngay khi quá trình tải lên hoàn tất, Transaction Log trên NameNode chính sẽ được xóa bỏ (purged) để bắt đầu một chu kỳ ghi nhật ký mới, giúp NameNode tránh được tình trạng file log quá lớn và rút ngắn đáng kể thời gian phục hồi mỗi khi hệ thống khởi động lại.

## Mô thức xử lý dữ liệu MapReduce
### Tổng quan
- Là mô thức xử lý dữ liệu, không phải ngôn ngữ lập trình
- Đặc điểm:
	+ Simplicity: Bởi vì chỉ cần phải viết 2 chương trình là Mapper và Reducer
	+ Flexibility: Support nhiều cơ chế dùng mapper, reducer, có thể viết ở nhiều ngôn ngữ khác nhau 
	+ Scalability: có thể scale tính toán trên nhiều máy

### A MR job = {Isolated Tasks}n
- Mỗi chương trình MR là một job được chia thành nhiều isolated task và các task này được phân tán trên các nodes khác nhau trong cụm để thực thi -> giảm truyền thông giữa các node máy chủ, tránh phải thực hiện dồng bộ 

### Dữ liệu cho MapReduce: 
- Thường làm việc với dữ liệu đã có sẵn trên HDFS 
- Khi thực thi, mã chương trình MapReduce được gửi tới các node đã có dữ liệu tương ứng

Dưới đây là nội dung được trình bày dưới định dạng Markdown (.md) để bạn có thể dễ dàng lưu trữ hoặc đưa vào tài liệu dự án của mình:

---

### Chương trình MapReduce:

#### 1. Nguyên lý cốt lõi

* **Lập trình viên:** Chỉ cần tập trung cài đặt 2 hàm chính là **Map** và **Reduce**.
* **Thực thi:** Các hàm này sẽ được chạy bởi các tiến trình tương ứng là **Mapper** và **Reducer**.
* **Cấu trúc dữ liệu:** Mọi dữ liệu đi qua hệ thống đều được nhìn nhận dưới dạng các cặp **Key-Value** (Khóa - Giá trị).

#### 2. Luồng dữ liệu qua các hàm

Hàm Map và Reduce nhận đầu vào và trả ra các cặp key-value theo quy tắc:

* **Hàm Map:** Tiếp nhận dữ liệu thô, trích xuất và biến đổi chúng thành các cặp key-value trung gian.
* **Hàm Reduce:** Tiếp nhận các cặp key-value trung gian đã được nhóm theo Key để thực hiện tính toán tổng hợp.

---

#### 3. Các bước xử lý chi tiết (Workflow)

Quá trình MapReduce diễn ra qua 3 giai đoạn chính:

 A. Giai đoạn Map (Phân tách)

* Dữ liệu đầu vào từ HDFS được chia thành các phần nhỏ (Input Splits).
* Các Mapper đọc dữ liệu và chuyển đổi thành các cặp `(Key, Value)` trung gian.
* **Đặc điểm:** Bước này có tính song song cực cao và thường ưu tiên xử lý tại node lưu trữ dữ liệu (Data Locality).

B. Giai đoạn Shuffle & Sort (Xáo trộn & Sắp xếp)

Đây là giai đoạn trung gian quan trọng nhất do hệ thống tự động thực hiện:

* **Shuffle:** Di chuyển dữ liệu từ các node Mapper về các node Reducer sao cho tất cả các giá trị có cùng một Key sẽ hội quân tại cùng một Reducer.
* **Sort:** Sắp xếp các Key theo thứ tự để chuẩn bị cho việc tổng hợp.
* **Kết quả:** Đầu ra của bước này là một danh sách các giá trị đi kèm với mỗi Key: `(Key, list(Value))`.

C. Giai đoạn Reduce (Tổng hợp)

* Reducer nhận đầu vào từ bước Shuffle & Sort.
* Thực hiện các phép toán nghiệp vụ (như cộng tổng, đếm, tìm giá trị trung bình...) trên danh sách các giá trị của mỗi Key.
* **Kết quả:** Ghi các cặp `(Key, Value)` cuối cùng xuống hệ thống lưu trữ (HDFS).

---

---

### Vai trò của Job Tracker và Task Tracker 
(giải thích ở đây)

## Các thành phần khác trong hệ sinh thái Hadoop
### Apache Pig 
- Cung cấp giao diện xử lý dữ liệu ở mức cao -> biến đổi script thành các jobs MapReduce, đưa các jobs này lên tính toán
### Apache Hive 
- Chức năng Cũng tương tự Apache Pig nhưng cung cấp ngôn ngữ HiveQL: SQL-like language
### Apache Hbase 
- Là một CSDL dạng cột, lưu dữ liệu trên HDFS, trái với CSDL dạng row thông thường
- Là NoSQL
### Apache Sqoop
- Hỗ trợ trung chuyển dữ liệu theo khối từ Apache Hadoop và các CSDL có cấu trúc như CSDL quan hệ. VD chuyển từ mysql sang hdfs có thể dùng công cụ này.
### Apache Kafka 
- Message queue, lưu trữ tạm thời 
### Apache Zookeeper 
- Là công cụ hỗ trợ quản lý các server khác nhau. Group các server giống nhau thành cluster -> bầu ra leader, giám sát trạng thái, quản lý thông tin cấu hình động -> Là service lõi, tối quan trọng trong hệ thống phân tán
### YARN 
- Hadoop 1.0 là sử dụng Job tracker và Task tracker. 2.0: YARN -> cấp phát tài nguyên: CPU, RAM,... YARN đóng vai trò là lớp trên HDFS và dưới mức ứng dụng như các chương trình MapReduce hoặc các chương trình data processing khác như Spark. Với MapReduce job, vai trò của job tracker -> application tracker
- Trong cơ chế cấp phát của YARN, NodeManager quản lý tài nguyên phần cứng tại mỗi máy, ApplicationMaster điều phối và đòi hỏi tài nguyên cho từng ứng dụng cụ thể, còn Container đóng vai trò là các gói tài nguyên CPU và RAM được cô lập để trực tiếp thực thi các tác vụ xử lý dữ liệu.


