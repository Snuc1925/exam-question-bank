## What is Kafka? 
- **Apache Kafka** là một nền tảng truyền thông điệp (messaging system) mã nguồn mở theo mô hình **Publish-Subscribe**, được thiết kế để xử lý các luồng dữ liệu thời gian thực với hiệu suất cực cao, khả năng mở rộng linh hoạt và độ tin cậy tuyệt đối.

Thay vì chỉ là một hàng đợi tin nhắn thông thường, Kafka hoạt động như một hệ thống lưu trữ phân tán cho các luồng hồ sơ (streams of records), cho phép tách rời (decouple) các luồng dữ liệu giữa hệ thống nguồn và hệ thống đích.

### Các đặc điểm cốt lõi của Kafka

* **Mô hình Publish-Subscribe:** Các hệ thống nguồn (Producers) đẩy dữ liệu vào các chủ đề (Topics), và các hệ thống tiêu thụ (Consumers) đăng ký để nhận dữ liệu từ các Topic đó.
* **Lưu trữ chịu lỗi (Fault-tolerant Storage):** Kafka không chỉ truyền tin mà còn lưu trữ chúng. Nó **nhân bản (replicate)** các phân vùng nhật ký (Topic Log Partitions) ra nhiều máy chủ khác nhau. Nếu một máy chủ bị sập, dữ liệu vẫn an toàn và sẵn sàng ở các máy chủ khác.
* **Xử lý dữ liệu thời gian thực:** Cho phép xử lý các bản ghi ngay khi chúng vừa xuất hiện (real-time processing).
* **Hiệu năng vượt trội:** Kafka đạt được tốc độ cực nhanh nhờ tối ưu hóa I/O, sử dụng cơ chế **batching** (gom nhóm dữ liệu) và nén dữ liệu (compression) để giảm tải cho hạ tầng mạng.

### Tại sao nên dùng Kafka thay vì JMS hay RabbitMQ?

Trong các hệ thống Big Data hiện đại, Kafka thường được ưu tiên hơn các giải pháp truyền thống như JMS, RabbitMQ hay AMQP nhờ vào:

1. **Thông lượng cao (Higher Throughput):** Khả năng xử lý hàng triệu tin nhắn mỗi giây.
2. **Độ tin cậy (Reliability):** Dữ liệu được lưu trữ trên đĩa cứng và có cơ chế nhân bản tự động.
3. **Khả năng mở rộng:** Dễ dàng thêm các Broker (máy chủ Kafka) vào cụm mà không làm gián đoạn hệ thống.


---
## Khả năng của Kafka
Khả năng của Apache Kafka không chỉ dừng lại ở việc truyền tin nhắn đơn thuần mà nó còn đóng vai trò là "hệ thần kinh" trung tâm cho toàn bộ hệ sinh thái dữ liệu. Dưới đây là những ứng dụng quan trọng mà Kafka mang lại:

### 1. Xây dựng ứng dụng và phân tích thời gian thực

* **Streaming Applications:** Kafka cho phép xây dựng các ứng dụng phản ứng tức thì với các luồng dữ liệu (ví dụ: phát hiện gian lận tài chính ngay khi giao dịch vừa phát sinh).
* **Xử lý luồng (Stream Processing):** Bạn có thể biến đổi (transform), hợp nhất (join) hoặc gom nhóm (aggregate) các luồng dữ liệu đang chảy trong hệ thống, ví dụ như thu thập và xử lý các chỉ số log (metrics) từ hàng nghìn máy chủ.
* **CEP (Complex Event Processing):** Cung cấp các sự kiện đầu vào cho các hệ thống xử lý sự kiện phức tạp để tìm ra các mô hình dữ liệu (patterns) có ý nghĩa.

### 2. Kết nối hạ tầng dữ liệu (Data Pipelines)

* **Cầu nối cho Big Data:** Kafka đóng vai trò là vùng đệm, nạp dữ liệu vào các hệ thống phân tích có độ trễ cao hơn như **Apache Spark** hoặc **Hadoop** để xử lý batch hàng giờ hoặc hàng ngày.
* **External Commit Log:** Hoạt động như một nhật ký ghi lại mọi thay đổi cho các hệ thống phân tán, giúp các node đồng bộ lại dữ liệu hoặc khôi phục trạng thái (restore state) sau khi gặp sự cố.
* **Dashboards:** Cung cấp dữ liệu liên tục để cập nhật các biểu đồ và báo cáo tổng hợp theo thời gian thực (real-time dashboards).

### 3. Hỗ trợ kiến trúc Microservices

* **In-memory Microservices:** Kafka cho phép triển khai các kiến trúc microservices hiện đại như mô hình **Actors (Akka)**, **Vert.x**, hoặc **RxJava**. Bằng cách sử dụng Kafka làm nguồn dữ liệu chính, các dịch vụ này có thể lưu trữ dữ liệu ngay trên bộ nhớ (in-memory) để đạt tốc độ truy xuất cực nhanh mà vẫn đảm bảo tính bền vững nhờ vào log của Kafka.

---
## Why is Kafka popular?
Apache Kafka trở nên phổ biến và trở thành tiêu chuẩn công nghiệp nhờ vào sự kết hợp giữa hiệu năng cực cao và khả năng quản trị linh hoạt. Dưới đây là những lý do chính khiến nó được cộng đồng kỹ sư dữ liệu tin dùng:

### 1. Hiệu năng và Độ tin cậy tuyệt vời

* **Hiệu năng vượt trội (Great performance):** Kafka sử dụng cơ chế ghi tuần tự vào đĩa (sequential I/O) và kỹ thuật *zero-copy* để đạt được thông lượng (throughput) cực lớn với độ trễ thấp.
* **Tính bền vững ổn định (Stable, reliable durability):** Dữ liệu không chỉ được truyền đi mà còn được lưu trữ an toàn trên đĩa cứng. Với cơ chế **nhân bản mạnh mẽ (Robust replication)**, Kafka đảm bảo dữ liệu luôn sẵn sàng ngay cả khi một số broker (máy chủ) gặp sự cố.

### 2. Thiết kế thông minh và Linh hoạt

* **Mô hình Pub-Sub linh hoạt:** Kafka có thể hoạt động vừa như một hàng đợi (queue) truyền thống, vừa như một hệ thống phát tin (publish-subscribe). Nó có thể mở rộng không giới hạn với **N-nhóm người tiêu dùng (consumer groups)**, cho phép nhiều ứng dụng khác nhau đọc cùng một luồng dữ liệu một cách độc lập.
* **Bảo toàn thứ tự (Ordering preserved):** Đây là một tính năng cực kỳ quan trọng. Kafka đảm bảo thứ tự của các tin nhắn được bảo toàn ở cấp độ **shard (topic partition)**. Điều này giúp các ứng dụng cần xử lý dữ liệu theo đúng trình tự thời gian (như giao dịch ngân hàng hoặc log sự kiện) hoạt động chính xác.

### 3. Khả năng kiểm soát cho nhà phát triển

* **Tùy chỉnh tính nhất quán (Tunable consistency):** Phía Producer có thể tùy chỉnh các đảm bảo về tính nhất quán thông qua tham số `acks`. Bạn có thể chọn ưu tiên tốc độ (không cần phản hồi) hoặc ưu tiên an toàn dữ liệu (chờ tất cả các bản sao xác nhận).
* **Vận hành đơn giản (Operational simplicity):** Kafka được thiết kế để dễ dàng cài đặt, sử dụng và suy luận (easy to reason). Khi hệ thống cần mở rộng, bạn chỉ cần thêm broker mà không cần thay đổi kiến trúc phức tạp.

### 4. Hệ sinh thái kết nối mạnh mẽ

Kafka hoạt động cực kỳ hiệu quả với các hệ thống cần xử lý, tổng hợp (aggregate), biến đổi (transform) và nạp dữ liệu (load) vào các kho lưu trữ khác. Nó là "xương sống" hoàn hảo cho các kiến trúc như **Lambda Architecture** mà bạn đang áp dụng cho dự án Big Data của mình, nơi dữ liệu cần chảy mượt mà từ nguồn vào cả lớp Speed (Spark Streaming) và lớp Batch (HDFS/S3).

---
## Key terminology
Để nắm vững cách vận hành của Kafka, bạn cần hiểu rõ các thuật ngữ cốt lõi cấu thành nên hệ thống này. Hãy tưởng tượng Kafka như một thư viện khổng lồ, nơi dữ liệu được tổ chức một cách khoa học:

### 1. Topic (Chủ đề)

* **Topic** là tên danh mục hoặc nguồn cấp dữ liệu (feed name) dùng để phân loại tin nhắn. Ví dụ: một topic tên là `/reddit-posts` sẽ chỉ chứa các bài đăng từ Reddit.
* Bạn có thể coi Topic là một **luồng bản ghi (stream of records)** liên tục.
* Dữ liệu trong Topic được lưu trữ dưới dạng **Log** (nhật ký) trực tiếp trên đĩa cứng, giúp dữ liệu bền vững và không bị mất khi mất điện.

### 2. Partition & Segment (Phân vùng & Phân đoạn)

* Một Topic lớn sẽ được chia nhỏ thành nhiều **Partitions** để có thể lưu trữ trên nhiều máy chủ khác nhau.
* Việc chia nhỏ này giúp Kafka có thể xử lý song song (parallelism) và mở rộng quy mô dễ dàng.
* **Segments** là các tệp tin vật lý nhỏ hơn bên trong một Partition trên đĩa cứng.

### 3. Record (Bản ghi)

* Đây là đơn vị dữ liệu nhỏ nhất trong Kafka. Một Record bao gồm: **Key** (tùy chọn), **Value** (nội dung dữ liệu) và **Timestamp** (dấu thời gian).
* Đặc tính quan trọng nhất: **Immutable** (Bất biến). Khi một bản ghi đã được ghi vào Kafka, nó không bao giờ có thể bị thay đổi.

### 4. Producer & Consumer (Người sản xuất & Người tiêu dùng)

* **Producer:** Là các ứng dụng đẩy (publish) dữ liệu vào các Kafka Topic. Ví dụ: Một script Python lấy dữ liệu từ Reddit API chính là một Producer.
* **Consumer:** Là các ứng dụng đăng ký (subscribe) vào Topic để lấy dữ liệu về xử lý. Ví dụ: Spark Streaming đọc dữ liệu từ Kafka để phân tích cảm xúc.

### 5. Broker & Cluster

* **Broker:** Là một máy chủ (server) chạy Kafka. Một Broker chịu trách nhiệm nhận yêu cầu từ Producer, lưu trữ dữ liệu và trả dữ liệu cho Consumer.
* **Cluster:** Là một nhóm gồm nhiều **Brokers** làm việc cùng nhau để đảm bảo tính sẵn sàng cao và khả năng chịu lỗi.

--- 
## Kafka architecture

Kiến trúc của Apache Kafka là một hệ thống phân tán mạnh mẽ, nơi sự phối hợp giữa các máy chủ lưu trữ dữ liệu và hệ thống quản lý cấu hình đóng vai trò then chốt.

### 1. Thành phần cốt lõi của Cluster

Một Kafka Cluster không chỉ đơn thuần là các máy chủ chứa dữ liệu mà là sự kết hợp của:

* **Kafka Brokers:** Nhiều máy chủ (Brokers) làm việc cùng nhau để tiếp nhận, lưu trữ và phân phối các bản ghi.
* **Zookeeper:** Đóng vai trò là "bộ não" quản trị của toàn bộ Cluster. Nó duy trì trạng thái ổn định và sự đồng bộ cho các Broker.
* **Giao thức TCP:** Mọi giao tiếp giữa Producer, Consumer, Broker và Zookeeper đều được thực hiện thông qua một **Binary API** hiệu năng cao, chạy trên giao thức TCP để đảm bảo tốc độ và độ tin cậy.

### 2. Vai trò của Zookeeper (Người điều phối)

Trong kiến trúc Kafka truyền thống, Zookeeper là thành phần không thể thiếu với các nhiệm vụ quan trọng:

* **Quản lý cấu hình (In-sync view):** Cung cấp một cái nhìn thống nhất về cấu hình của toàn bộ cluster cho tất cả các thành phần.
* **Bầu chọn lãnh đạo (Leadership Election):** Zookeeper chịu trách nhiệm bầu chọn "Leader" cho các Broker và đặc biệt là cho từng **Topic Partition**. Mọi thao tác ghi và đọc chính sẽ đi qua Leader, trong khi các bản sao (Followers) sẽ sao chép dữ liệu từ Leader này.
* **Phát hiện dịch vụ (Service Discovery):** Theo dõi danh sách các Broker đang hoạt động. Khi một Broker mới gia nhập hoặc một Broker cũ bị lỗi (died), Zookeeper sẽ ngay lập tức nhận diện.
* **Thông báo thay đổi:** Zookeeper gửi các cập nhật quan trọng đến Kafka khi có biến động:
* Sự thay đổi về hạ tầng: Thêm/mất Broker.
* Sự thay đổi về logic: Thêm hoặc xóa một Topic.

---
## Kafka topics, logs, partitions

Để hiểu sâu về cách Kafka lưu trữ và quản lý dữ liệu cho dự án Big Data của bạn, chúng ta cần phân tích cấu trúc phân tầng từ **Topic** đến **Partition** và cuối cùng là **Log**.

### 1. Kafka Topics & Logs

* **Dòng dữ liệu (Stream of records):** Một Topic là một luồng dữ liệu logic. Trong dự án của bạn, ví dụ Topic `reddit_comments` sẽ chứa tất cả các bình luận được đẩy vào từ API.
* **Lưu trữ dạng Log:** Về mặt vật lý, Topic được lưu trữ dưới dạng **nhật ký (log)** trên đĩa cứng. Đây là cấu trúc dữ liệu chỉ cho phép ghi thêm (append-only).
* **Mô hình Pub/Sub:** Topic hoạt động theo cơ chế phát tin. Một Topic có thể không có ai đọc hoặc có rất nhiều nhóm người tiêu dùng (**Consumer Groups**) đăng ký cùng lúc mà không ảnh hưởng đến hiệu năng của nhau.

### 2. Topic Partitions: Chìa khóa để mở rộng (Scaling)

Một Topic đơn lẻ có thể trở nên quá lớn đối với một máy chủ. Kafka giải quyết điều này bằng cách chia nhỏ Topic thành các **Partitions**:

* **Phân tán dữ liệu:** Partitions cho phép Kafka trải dài một Topic ra nhiều Broker (máy chủ) khác nhau. Đây là cách Kafka đạt được khả năng mở rộng theo chiều ngang.
* **Định tuyến theo Key:** Khi Producer gửi một bản ghi (record), Kafka sẽ dựa vào **Key** của bản ghi đó để quyết định nó thuộc về Partition nào (thường dùng hàm băm). Điều này cực kỳ quan trọng vì nó đảm bảo các dữ liệu có cùng Key (ví dụ: tất cả bình luận của cùng một `user_id`) sẽ luôn nằm trên cùng một Partition.
* **Nhân bản (Replication):** Mỗi Partition có thể được sao chép ra nhiều Broker để đảm bảo an toàn dữ liệu.

### 3. Topic Partition Log: Thứ tự và Offset

Bên trong mỗi Partition, dữ liệu được tổ chức một cách nghiêm ngặt:

* **Bảo toàn thứ tự:** Kafka **chỉ đảm bảo thứ tự tin nhắn trong phạm vi một Partition duy nhất**. Nếu bạn gửi tin nhắn vào các Partition khác nhau, thứ tự giữa chúng sẽ không được đảm bảo khi đọc ra.
* **Cấu trúc Commit Log:** Mỗi Partition là một chuỗi các bản ghi có thứ tự, bất biến (immutable) và liên tục được ghi thêm vào cuối.
* **Offset:** Mỗi bản ghi trong một Partition được gán cho một số định danh tuần tự gọi là **Offset**. Đây là "địa chỉ" duy nhất của bản ghi đó trong Partition. Consumer sẽ sử dụng Offset này để theo dõi xem mình đã đọc đến đâu.

---
## Kafka partition replication

Trong hệ thống Kafka, cơ chế **Replication** (nhân bản) là xương sống giúp hệ thống đạt được khả năng chịu lỗi (fault tolerance) và tính sẵn sàng cao. Dưới đây là cách Kafka quản lý các Partition thông qua mô hình Leader-Follower:

### 1. Vai trò của Leader và Follower

Mỗi Partition trong Kafka không tồn tại đơn lẻ mà được nhân bản ra nhiều máy chủ (Brokers) khác nhau:

* **Leader (Người dẫn đầu):** Mỗi Partition sẽ có duy nhất một Broker đóng vai trò là Leader. Mọi yêu cầu **Đọc (Read)** và **Ghi (Write)** từ phía client (Producer/Consumer) đều phải đi qua Leader này.
* **Followers (Người theo dõi):** Đây là các bản sao của Leader. Nhiệm vụ duy nhất của chúng là sao chép (replicate) dữ liệu từ Leader về máy mình để đảm bảo tính đồng bộ. Chúng không trực tiếp xử lý yêu cầu từ client.

### 2. Khái niệm ISR (In-Sync Replica)

Một khái niệm cực kỳ quan trọng trong quản trị Kafka là **ISR**:

* Một Follower được gọi là **ISR** nếu nó đang ở trạng thái "bắt kịp" hoàn toàn với dữ liệu của Leader (trong một khoảng thời gian/độ trễ cho phép).
* **Cơ chế chịu lỗi:** Nếu chẳng may Leader của một Partition bị hỏng (fail), hệ thống sẽ tự động bầu chọn một node trong danh sách **ISR** để lên làm Leader mới. Điều này đảm bảo dữ liệu không bị mất và dịch vụ không bị gián đoạn.

### 3. Phân phối và Nhân bản (Fault Tolerance)

* **Phân phối tải:** Các Partition của cùng một Topic sẽ được rải rác trên các máy chủ khác nhau trong cụm Kafka. Mỗi máy chủ sẽ chịu trách nhiệm xử lý dữ liệu cho một "phần" (share) các Partition đó, giúp tận dụng tối đa băng thông và tài nguyên của toàn cụm.
* **Cấu hình nhân bản:** Số lượng bản sao của mỗi Partition là có thể cấu hình được (**Replication Factor**). Ví dụ, nếu bạn đặt `replication-factor = 3`, dữ liệu của bạn sẽ được lưu ở 3 nơi khác nhau.

---
## Guarantees

Để kết thúc phần kiến thức về Kafka, hãy cùng điểm lại các **cam kết (Guarantees)** mạnh mẽ mà hệ thống này cung cấp. Những cam kết này chính là lý do tại sao Kafka trở thành lựa chọn hàng đầu cho các hệ thống yêu cầu độ tin cậy cao như kiến trúc Lambda mà bạn đang xây dựng.

### 1. Cam kết về thứ tự (Order Guarantee)

Kafka đảm bảo rằng các tin nhắn được gửi bởi một Producer đến một **Partition cụ thể** của Topic sẽ được nối thêm (append) vào log theo đúng thứ tự mà chúng được gửi đi.

* Điều này có nghĩa là nếu tin nhắn  được gửi trước , thì  sẽ có offset nhỏ hơn  và xuất hiện sớm hơn trong log của Partition đó.

### 2. Cam kết về độ tin cậy và ISR

Bạn có thể cấu hình số lượng **ISR (In-Sync Replicas) tối thiểu** cần thiết để một thao tác ghi được coi là thành công.

* Nếu số lượng replica đang hoạt động thấp hơn ngưỡng cấu hình này (ví dụ: do quá nhiều máy chủ bị sập cùng lúc), Kafka sẽ trả về lỗi cho Producer thay vì chấp nhận dữ liệu nhưng không thể đảm bảo an toàn. Điều này giúp ngăn chặn việc mất dữ liệu trong các tình huống ngặt nghèo.

### 3. Cam kết đối với Consumer

Một Consumer instance khi đọc dữ liệu từ một Partition sẽ luôn thấy các tin nhắn theo **đúng thứ tự** mà chúng được lưu trữ trong log.

* Điều này đảm bảo tính nhất quán trong xử lý: dữ liệu cũ luôn được xử lý trước dữ liệu mới (FIFO trong phạm vi Partition).

### 4. Khả năng chịu lỗi (Fault Tolerance)

Đối với một Topic có **Replication Factor là **, Kafka có khả năng chịu đựng việc hỏng hóc lên đến ** máy chủ** mà không làm mất bất kỳ tin nhắn nào đã được "committed" (xác nhận ghi thành công) vào log.

* Ví dụ: Với , bạn có thể mất đồng thời 2 Broker mà dữ liệu vẫn an toàn và hệ thống vẫn có thể phục vụ người dùng từ Broker còn lại.

---
## Kafka record retention

Một trong những đặc điểm khác biệt nhất của Kafka so với các hệ thống Message Queue truyền thống (như RabbitMQ) là cách nó quản lý việc lưu trữ dữ liệu. Thay vì xóa bỏ tin nhắn ngay khi chúng được đọc, Kafka giữ lại (retain) tất cả các bản ghi đã được xuất bản dựa trên các chính sách cấu hình cụ thể.

### 1. Các chính sách lưu giữ dữ liệu (Retention Policies)

Dữ liệu trong Kafka sẽ luôn sẵn sàng để tiêu thụ cho đến khi bị loại bỏ bởi một trong ba cơ chế sau:

* **Dựa trên thời gian (Time-based):** Đây là cách phổ biến nhất. Bạn có thể cấu hình để Kafka giữ lại dữ liệu trong 3 ngày, 2 tuần hoặc thậm chí là một tháng. Sau khoảng thời gian này, các bản ghi cũ nhất sẽ bị xóa để giải phóng không gian.
* **Dựa trên kích thước (Size-based):** Bạn có thể giới hạn dung lượng lưu trữ cho một Partition (ví dụ: 10GB). Khi Partition vượt quá kích thước này, Kafka sẽ bắt đầu xóa các bản ghi cũ nhất.
* **Log Compaction (Nén nhật ký):** Thay vì xóa theo thời gian hay kích thước, cơ chế này chỉ giữ lại **bản ghi mới nhất** cho mỗi Key. Điều này cực kỳ hữu ích cho việc khôi phục trạng thái (state recovery), đảm bảo rằng bạn luôn có giá trị cuối cùng của một đối tượng (ví dụ: số dư tài khoản mới nhất của một user).

### 2. Đặc tính vận hành của Retention

* **Tính sẵn sàng liên tục:** Dữ liệu vẫn nằm ở đó và có thể được đọc đi đọc lại bởi nhiều Consumer khác nhau với tốc độ khác nhau, miễn là nó chưa bị xóa theo chính sách retention.
* **Hiệu năng ổn định:** Một điểm cực kỳ mạnh mẽ của Kafka là **tốc độ đọc (consumption speed) không bị ảnh hưởng bởi kích thước dữ liệu lưu trữ**. Nhờ vào cấu trúc dữ liệu O(1) và cơ chế Page Cache của hệ điều hành, việc bạn lưu trữ 100GB hay 10TB dữ liệu thì tốc độ truy xuất bản ghi vẫn nhanh như nhau.

---
## Durable writes

Trong Apache Kafka, các nhà phát triển có quyền kiểm soát rất linh hoạt đối với sự đánh đổi giữa **Thông lượng (Throughput)** và **Độ bền (Durability)** của dữ liệu thông qua tham số cấu hình `acks` (acknowledgements).

Dưới đây là bảng phân tích chi tiết các mức độ xác nhận ghi dữ liệu:

### Bảng so sánh các mức độ Durable Writes

| Độ bền (Durability) | Hành vi trên mỗi sự kiện | Độ trễ (Latency) | Giá trị `acks` |
| --- | --- | --- | --- |
| **Cao nhất (Highest)** | Chờ **tất cả** các bản sao trong ISR xác nhận đã nhận dữ liệu. | Cao nhất | `-1` hoặc `all` |
| **Trung bình (Medium)** | Chỉ chờ **Leader** xác nhận đã nhận dữ liệu. | Trung bình | `1` |
| **Thấp nhất (Lowest)** | **Không yêu cầu** bất kỳ xác nhận nào từ Broker. | Thấp nhất | `0` |

---
## Producers 

Cách thức các **Producers** tương tác với Kafka đóng vai trò quyết định đến hiệu năng và tính chính xác của dữ liệu trong hệ thống phân tán. Dưới đây là các cơ chế cốt lõi về cách Producer đẩy dữ liệu vào các Topic:

### 1. Cơ chế Ghi dữ liệu (Push & Append)

* **Mô hình Push:** Các Producer chủ động gửi (push) dữ liệu đến Topic mà họ lựa chọn. Kafka không tự đi "kéo" dữ liệu từ nguồn.
* **Append-only:** Các bản ghi (Records) luôn được thêm vào **cuối** của nhật ký Topic (Topic log). Điều này giúp việc ghi dữ liệu đạt tốc độ cực nhanh vì đây là thao tác ghi tuần tự trên đĩa.

### 2. Chiến lược phân phối tải (Partitioning)

Một điểm cực kỳ quan trọng là: **Producer chính là bên quyết định bản ghi sẽ rơi vào Partition nào.** Có hai chiến lược phổ biến:

* **Round-robin (Luân phiên):** Nếu bản ghi không có Key, Producer sẽ gửi dữ liệu xoay vòng giữa các Partition. Điều này giúp tải trọng được phân phối đều nhất có thể trên các Broker.
* **Semantic Partitioning (Phân vùng theo ngữ nghĩa):** Producer dựa vào một **Key** trong tin nhắn để chọn Partition.
* **Ví dụ:** Bạn có thể thiết lập để tất cả dữ liệu có cùng `employeeId` hoặc `userId` từ Reddit luôn đi vào cùng một Partition.
* **Lợi ích:** Đảm bảo thứ tự tin nhắn cho cùng một đối tượng và hỗ trợ các thao tác "stateful processing" (như tính tổng điểm cho từng User) một cách hiệu quả.


### 3. Cơ chế tìm kiếm Metadata

Làm sao Producer biết được phải gửi dữ liệu đến đâu?

* Mọi node (Broker) trong cụm Kafka đều có khả năng trả lời các yêu cầu về **Metadata**.
* Metadata này cung cấp thông tin:
* Những máy chủ nào đang hoạt động (Alive).
* Node nào đang là **Leader** của từng Partition cụ thể.


* Nhờ vậy, Producer có thể kết nối trực tiếp đến đúng Leader của Partition đó để ghi dữ liệu mà không cần qua trung gian.

---
## Consumer

Cách tiếp cận của **Consumer** trong Kafka khác biệt hoàn toàn so với các hệ thống hàng đợi truyền thống (như RabbitMQ). Thay vì xóa tin nhắn ngay khi đã gửi cho người nhận, Kafka trao toàn quyền kiểm soát việc đọc dữ liệu cho chính Consumer.

### 1. Nhiều Consumer trên cùng một Topic

Kafka cho phép nhiều Consumer (người tiêu dùng) cùng đăng ký và đọc từ một Topic duy nhất một cách hoàn toàn độc lập.

* **Ví dụ:** Trong dự án Big Data của bạn, bạn có thể có một Consumer đẩy dữ liệu vào **HDFS** (Batch Layer) và một Consumer khác đồng thời gửi dữ liệu vào **Spark Streaming** (Speed Layer). Cả hai đều đọc cùng một luồng dữ liệu Reddit mà không hề gây xung đột hay làm chậm lẫn nhau.

### 2. Tự quản lý Offset

Trong Kafka, máy chủ (Broker) không theo dõi xem bạn đã đọc đến đâu. Thay vào đó, **mỗi Consumer chịu trách nhiệm quản lý Offset của chính mình**.

* **Offset** giống như một "dấu trang" (bookmark) ghi lại vị trí của bản ghi cuối cùng mà Consumer đó đã xử lý trong Partition.
* **Lợi ích:** Consumer có thể tùy ý điều chỉnh Offset để đọc lại dữ liệu cũ (Replay) nếu xảy ra lỗi xử lý, hoặc nhảy đến Offset mới nhất để bỏ qua dữ liệu cũ.

### 3. Dữ liệu luôn tồn tại trên Kafka

Đây là đặc điểm quan trọng nhất giúp Kafka hỗ trợ các hệ thống phân tán:

* **Không xóa sau khi đọc:** Sau khi một Consumer đọc xong một bản ghi, bản ghi đó **không bị xóa**. Nó vẫn nằm trong log của Kafka cho đến khi hết hạn theo chính sách lưu giữ (Retention policy) mà bạn đã thiết lập (ví dụ: sau 7 ngày).
* **Tính bền vững:** Điều này cho phép các hệ thống khác "nhảy vào" và đọc lại toàn bộ lịch sử dữ liệu bất cứ lúc nào, cực kỳ hữu ích cho việc khôi phục dữ liệu hoặc chạy lại các mô hình phân tích (re-processing).

---
## Consumer Group

Để hiểu rõ về **Consumer Group**, bạn hãy tưởng tượng Kafka Topic là một dòng tin tức liên tục, và các Consumer Group là những "phòng ban" khác nhau cùng theo dõi dòng tin đó.

Dưới đây là giải thích chi tiết các ý chính bạn vừa nêu:

### 1. Bản chất của Consumer Group (Nhóm người tiêu dùng)

* **Mỗi nhóm là một "Người đăng ký" độc lập:** Mỗi Consumer Group có một `group.id` duy nhất. Nếu bạn có 2 nhóm, Kafka sẽ coi đó là 2 thực thể riêng biệt. Mỗi nhóm sẽ nhận được **toàn bộ** dữ liệu từ Topic đó.
* **Tách biệt chức năng (Decoupling):** Như bạn đã ví dụ, trong dự án Big Data của mình:
* **Group A:** Đọc dữ liệu để đẩy vào Microservices (xử lý nghiệp vụ).
* **Group B:** Đọc cùng dữ liệu đó để đẩy vào Hadoop/HDFS (lưu trữ lịch sử).
* Hai nhóm này chạy song song, không ảnh hưởng đến nhau. Nếu Group A bị chậm, Group B vẫn có thể chạy nhanh bình thường vì mỗi nhóm tự quản lý **Offset (vị trí đọc)** riêng của mình.



### 2. Cách hoạt động bên trong một nhóm (Load Balancing)

Đây là phần quan trọng nhất để hiểu về tính hiệu quả của Kafka:

* **Chia sẻ tải (One record - One consumer):** Trong cùng một nhóm, mỗi bản ghi (record) chỉ được gửi đến **duy nhất một** Consumer instance. Các thành viên trong nhóm sẽ tự động chia nhau các Partition để đọc.
* **Cân bằng tải:** Nếu bạn có 4 Partition và 2 Consumer trong một nhóm, mỗi Consumer sẽ đọc từ 2 Partition. Không bao giờ có chuyện 2 Consumer trong cùng một nhóm cùng đọc 1 Partition (vì như vậy sẽ bị trùng lặp dữ liệu).


### 3. Các mô hình (Patterns) phổ biến

#### Mô hình 1: Tất cả Consumer ở cùng một nhóm (Giống Hàng đợi truyền thống)

* Nó giống như một hàng chờ ở ngân hàng: Nhiều nhân viên (Consumer) cùng phục vụ một hàng khách (Topic). Mỗi khách chỉ gặp một nhân viên.
* **Mục đích:** Cân bằng tải, xử lý dữ liệu cực nhanh bằng cách chia việc cho nhiều máy.

#### Mô hình 2: Mỗi Consumer ở một nhóm riêng (Broadcast)

* Mỗi khi có tin nhắn mới, **tất cả** các Consumer đều nhận được một bản sao của tin nhắn đó.
* **Mục đích:** Giống như đài phát thanh, ai bật radio lên cũng nghe được toàn bộ nội dung.

#### Mô hình 3: "Logical Subscriber" (Mô hình thực tế nhất)

* Bạn kết hợp cả hai: Chia hệ thống thành các nhóm lớn (theo chức năng), và trong mỗi nhóm đó lại có nhiều Consumer instance để tăng tốc độ và dự phòng lỗi.
* **Scalability (Mở rộng):** Muốn xử lý nhanh hơn? Chỉ cần thêm Consumer vào nhóm (đến khi số Consumer bằng số Partition).
* **Fault Tolerance (Chịu lỗi):** Nếu một máy trong nhóm bị sập, Kafka sẽ tự động chuyển các Partition của máy đó cho các máy còn lại trong nhóm xử lý tiếp.


### 4. Kafka Consumer Load Share (Chia sẻ tải động)

Kafka quản lý việc phân chia công việc trong một nhóm một cách tự động thông qua giao thức **Rebalance**:

* **Tự động điều tiết:** Khi có một Consumer mới gia nhập nhóm (Scale out), Kafka sẽ tính toán lại và chuyển một số Partition từ các Consumer hiện tại sang cho người mới.
* **Tự phục hồi:** Nếu một Consumer bị sập (Die/Crash), Kafka sẽ phát hiện thông qua việc thiếu "nhịp tim" (heartbeat). Ngay lập tức, các Partition mà Consumer đó đang đảm nhiệm sẽ được chia lại cho các Consumer còn sống trong nhóm.


### 5. Kafka Consumer Failover (Cơ chế xử lý lỗi)

Cơ chế này đảm bảo rằng nếu một máy chủ xử lý dữ liệu bị hỏng, công việc sẽ được tiếp quản bởi máy khác mà không làm mất dữ liệu:

* **Commit Offset:** Sau khi xử lý xong một bản ghi, Consumer sẽ gửi thông báo (commit) cho Broker để cập nhật vị trí đã đọc vào một topic hệ thống đặc biệt là `__consumer_offsets`.
* **At-least-once (Ít nhất một lần):** Nếu Consumer sập **sau khi** xử lý xong nhưng **trước khi** kịp commit offset, Kafka sẽ giao Partition đó cho Consumer khác. Consumer mới này sẽ bắt đầu đọc lại từ vị trí đã commit cuối cùng.
* **Hệ quả:** Một vài bản ghi có thể bị xử lý lặp lại.
> **Giải pháp cho bạn:** Dữ liệu Reddit của bạn nên được xử lý theo kiểu **Idempotent** (ví dụ: dùng ID bài viết làm khóa chính trong cơ sở dữ liệu để nếu ghi đè lần 2 thì dữ liệu vẫn không đổi).


### 6. Giới hạn đọc: High Watermark vs Log End Offset

Đây là cơ chế bảo vệ tính nhất quán, giúp Consumer không bao giờ đọc phải dữ liệu "ảo":

* **Log End Offset (LEO):** Là vị trí của bản ghi cuối cùng vừa được Producer ghi vào Leader Partition. Bản ghi này có thể chưa kịp nhân bản sang các máy chủ khác (Followers).
* **High Watermark (HW):** Là vị trí của bản ghi cuối cùng đã được nhân bản thành công sang **tất cả** các bản sao trong ISR.
* **Quy tắc an toàn:** Kafka chỉ cho phép Consumer đọc đến mức **High Watermark**.
* *Tại sao?* Vì nếu Consumer đọc đến LEO và ngay sau đó Leader bị sập khi chưa kịp nhân bản, bản ghi đó sẽ mất vĩnh viễn. Việc giới hạn ở HW đảm bảo rằng bất kể node nào lên làm Leader mới, dữ liệu mà Consumer đã đọc vẫn luôn tồn tại.


### 7. Consumer to partition cardinality

Khái niệm **Consumer to Partition Cardinality** (Quan hệ bản số giữa Consumer và Partition) là một quy tắc vàng trong Kafka để đảm bảo thứ tự xử lý dữ liệu và khả năng mở rộng.

Dưới đây là 3 kịch bản chính của mối quan hệ này:

#### 1. Quy tắc "Độc quyền" (Exclusive Access)

Trong cùng một Consumer Group, tại một thời điểm, một Partition **chỉ được phép** kết nối với duy nhất một Consumer instance.

* **Lý do:** Điều này đảm bảo rằng các tin nhắn trong Partition đó được xử lý theo đúng thứ tự (Sequential processing). Nếu có 2 Consumer cùng đọc 1 Partition, thứ tự tin nhắn sẽ bị xáo trộn ngay lập tức.

#### 2. Khi số Consumer lớn hơn số Partition (Dư thừa)

Nếu bạn có 5 Consumer nhưng chỉ có 3 Partitions:

* 3 Consumer sẽ làm việc (mỗi người 1 Partition).
* 2 Consumer còn lại sẽ ở trạng thái **ngồi chơi (idle)**.
* **Lợi ích:** Các Consumer idle này đóng vai trò là "lực lượng dự bị". Nếu một trong 3 Consumer đang chạy bị sập, Kafka sẽ ngay lập tức gán Partition cho Consumer đang idle để hệ thống không bị gián đoạn.

#### 3. Khi số Partition lớn hơn số Consumer (Chia sẻ)

Nếu bạn có 10 Partitions nhưng chỉ có 2 Consumer:

* Kafka sẽ phân chia đều tải trọng: Mỗi Consumer sẽ chịu trách nhiệm đọc dữ liệu từ 5 Partitions.
* **Lợi ích:** Giúp tiết kiệm tài nguyên máy chủ khi lưu lượng dữ liệu thấp. Tuy nhiên, mỗi Consumer sẽ phải gánh vác khối lượng công việc nặng hơn.

---
## Kafka scale and speed

Lý do Apache Kafka có thể xử lý hàng triệu tin nhắn mỗi giây mà không bị "nghẽn cổ chai" nằm ở sự kết hợp thông minh giữa thiết kế lưu trữ vật lý và cơ chế phân tán dữ liệu.

Dưới đây là cách Kafka đạt được tốc độ và khả năng mở rộng kinh ngạc:

### 1. Tốc độ ghi cực nhanh (Sequential Writes)

Kafka không lưu trữ dữ liệu trong các cấu trúc phức tạp như B-Tree của cơ sở dữ liệu truyền thống. Thay vào đó, nó ghi dữ liệu theo kiểu **Sequential Writes (Ghi tuần tự)** vào hệ thống tệp tin (filesystem).

* **Tại sao nhanh?** Thao tác ghi tuần tự vào đĩa cứng nhanh hơn rất nhiều so với ghi ngẫu nhiên (Random access) vì đầu đĩa không phải di chuyển nhiều. Tốc độ này có thể đạt tới **700 MB/s** hoặc hơn trên các ổ đĩa hiện đại.
* **Cấu trúc Append-only:** Kafka chỉ đơn giản là "dán" thêm dữ liệu mới vào cuối tệp log, giúp tối ưu hóa tối đa hiệu năng của đĩa cứng.

### 2. Mở rộng thông qua Sharding (Phân vùng)

Kafka giải quyết bài toán "nhiều người cùng đọc/ghi vào một chỗ" bằng cách chia nhỏ Topic Log thành nhiều **Partitions**.

* **Phân tán vật lý:** Các Partition của cùng một Topic có thể nằm trên **nhiều máy chủ khác nhau** (Brokers) hoặc các ổ đĩa khác nhau.
* **Ghi song song (Parallel Writes):** Nhiều Producers có thể ghi dữ liệu vào các Partition khác nhau của cùng một Topic đồng thời. Ví dụ: Producer A ghi vào Partition 1 trên Broker 1, Producer B ghi vào Partition 2 trên Broker 2. Điều này giúp loại bỏ điểm nghẽn tại một máy chủ duy nhất.
* **Đọc song song (Parallel Reads):** Các Consumer trong một nhóm có thể chia nhau đọc từ các Partition khác nhau một cách hiệu quả, giúp tăng tốc độ xử lý tổng thể của hệ thống.

### 3. Tận dụng Page Cache và Zero-copy

Ngoài việc ghi tuần tự, Kafka còn cực nhanh nhờ:

* **Page Cache:** Nó tận dụng bộ nhớ RAM còn trống của hệ điều hành để làm bộ đệm cho dữ liệu đĩa. Dữ liệu thường được đọc trực tiếp từ RAM thay vì phải truy cập vào đĩa vật lý.
* **Zero-copy:** Khi truyền dữ liệu từ đĩa sang mạng cho Consumer, Kafka sử dụng kỹ thuật "zero-copy" để đẩy dữ liệu trực tiếp từ page cache vào card mạng (NIC) mà không cần sao chép qua tầng ứng dụng, giúp giảm đáng kể tải cho CPU.

---
## Kafka scale and speed (2): high throughput and low latency

Để đạt được thông lượng cực cao (High Throughput) và độ trễ cực thấp (Low Latency), Kafka không chỉ dựa vào việc chia nhỏ dữ liệu (Sharding) mà còn tận dụng tối đa các cơ chế tối ưu hóa ở cấp độ hệ điều hành và phần cứng.

Dưới đây là các kỹ thuật "dưới nắp capo" giúp Kafka đạt được hiệu năng kinh ngạc:

### 1. Cơ chế Gom nhóm (Batching) và Nén (Compression)

Kafka không xử lý từng tin nhắn đơn lẻ một cách rời rạc, vì điều đó sẽ gây ra gánh nặng lớn cho tài nguyên mạng và ổ đĩa.

* **Batching:** Kafka gom nhiều tin nhắn nhỏ thành một "lô" (batch) lớn để gửi đi cùng lúc. Cơ chế này được áp dụng xuyên suốt từ phía Producer, đến việc ghi vào File system và khi truyền cho Consumer. Việc này giúp giảm số lượng yêu cầu mạng (network overhead) và tối ưu hóa việc ghi dữ liệu vào đĩa.
* **Nén dữ liệu hiệu quả:** Khi dữ liệu được gom thành batch, các thuật toán nén (như GZIP, Snappy, LZ4, Zstd) hoạt động hiệu quả hơn nhiều vì chúng tìm thấy nhiều phần dữ liệu trùng lặp hơn trong một lô lớn. Điều này làm giảm đáng kể băng thông mạng và độ trễ I/O.

### 2. Kỹ thuật Zero-copy và Linux Sendfile

Đây là "vũ khí bí mật" giúp Kafka vượt trội so với các hệ thống truyền tin khác.

* **Zero-copy I/O:** Thông thường, để gửi một tệp từ đĩa cứng sang mạng, dữ liệu phải qua 4 lần copy giữa các tầng (Disk -> Kernel Space -> User Space -> Kernel Space -> NIC). Kafka sử dụng lệnh `sendfile()` của Linux để đẩy dữ liệu **trực tiếp** từ Page Cache của Kernel sang card mạng (NIC).
* **Lợi ích:** Bỏ qua các bước copy trung gian không cần thiết vào tầng ứng dụng (Java/C++), giúp tiết kiệm tài nguyên CPU và giảm độ trễ tối đa.



--- 
## Kafka Positioning

Để hoàn thiện cái nhìn tổng quan về Kafka, chúng ta cần xác định rõ vị thế (**positioning**) của nó — tức là khi nào nên dùng và khi nào không nên dùng Kafka so với các công nghệ khác.

Dưới đây là các kịch bản thực tế khi cân nhắc sử dụng Kafka:

### 1. Truyền tải các tệp tin cực lớn (Large File Transfers)

* **Lời khuyên:** **Không nên dùng trực tiếp.** * Kafka được thiết kế cho các "tin nhắn" (messages) có kích thước vừa phải (thường dưới 1MB). Việc đẩy các tệp tin hàng GB vào Kafka sẽ làm nghẽn hệ thống.
* **Giải pháp:** Nếu bạn cần chuyển file qua Kafka, hãy chia nhỏ file (ví dụ: đọc từng dòng) hoặc chỉ gửi **siêu dữ liệu (metadata)** như đường dẫn tệp vào Kafka, còn tệp tin thật sự thì lưu trữ ở S3 hoặc HDFS.

### 2. Thay thế cho các hệ thống Message Queue truyền thống (RabbitMQ, JMS, Tibco)

* **Lời khuyên:** **Rất nên cân nhắc.**
* **Hiệu năng:** Các con số về hiệu năng của Kafka vượt trội hoàn toàn so với RabbitMQ trong các bài toán thông lượng lớn.
* **Lợi thế:** Kafka cho phép các "transient consumers" (người tiêu dùng tạm thời) có thể đọc lại dữ liệu cũ nhờ cơ chế lưu giữ (Retention). Nó cũng xử lý lỗi (failover) cực kỳ bền bỉ nhờ cơ chế nhân bản (replication).

### 3. Vấn đề Bảo mật (Security)

* **Lưu ý:** Trước đây, bảo mật là điểm yếu của Kafka (như mã lỗi `KAFKA-1682` bạn đề cập).
* Tuy nhiên, ở các phiên bản hiện đại (2025-2026), Kafka đã hỗ trợ tốt **SSL/TLS** để mã hóa đường truyền và **SASL (Kerberos, Scram)** để xác thực. Dù vậy, việc thiết lập bảo mật trong Kafka vẫn được coi là phức tạp hơn so với các hệ thống MQ truyền thống.

### 4. Biến đổi dữ liệu (Data Transformations)

* **Lời khuyên:** **Không làm được nếu chỉ dùng mỗi Kafka Broker.** * Bản thân Broker chỉ làm nhiệm vụ lưu trữ và điều phối tin nhắn (Store & Forward).
* **Giải pháp:** Để biến đổi dữ liệu (ví dụ: đổi định dạng từ JSON sang Avro), bạn cần kết hợp Kafka với các framework xử lý như **Kafka Streams**, **ksqlDB** hoặc **Apache Spark** (như cách bạn đang làm trong dự án Lambda).

