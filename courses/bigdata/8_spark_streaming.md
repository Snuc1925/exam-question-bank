## Spark streaming
Trong hệ sinh thái Apache Spark, **Spark Streaming** đóng vai trò là "mạch máu" cho các hệ thống cần phản hồi tức thì với dữ liệu. Đây là thành phần không thể thiếu trong kiến trúc **Lambda Architecture** mà bạn đang áp dụng cho dự án Reddit.

Dưới đây là phân tích chi tiết các đặc điểm cốt lõi bạn đã nêu:

### 1. Xử lý luồng thời gian thực với thông lượng lớn

Khác với các hệ thống xử lý từng bản ghi một (native streaming), Spark Streaming sử dụng mô hình **Micro-batching**:

* Dữ liệu nhận vào sẽ được gom lại thành các đợt nhỏ (ví dụ: 1 giây hoặc 500ms).
* Nhờ cơ chế này, Spark Streaming thừa hưởng được khả năng xử lý song song cực mạnh của Spark Core, giúp nó đạt được **thông lượng (throughput)** rất cao, có thể xử lý hàng triệu bản ghi mỗi giây.

### 2. DStream (Discretized Stream) và RDD

Đây là khái niệm quan trọng nhất để hiểu cách Spark Streaming vận hành:

* **DStream là gì?** Nó là một trừu tượng hóa mức cao, đại diện cho một luồng dữ liệu liên tục.
* **Bản chất vật lý:** Về mặt kỹ thuật, một DStream thực chất là một **chuỗi các RDD** liên tiếp nhau. Mỗi RDD chứa dữ liệu của một khoảng thời gian nhất định (batch interval).
* **Tính nhất quán:** Vì mỗi mắt xích trong DStream là một RDD, bạn có thể áp dụng tất cả các phép biến đổi của Spark (như `map`, `reduce`, `join`) lên luồng dữ liệu này một cách dễ dàng.

### 3. Khả năng chịu lỗi (Fault-tolerant)

Nhờ vào việc xây dựng trên nền tảng RDD, Spark Streaming có cơ chế chịu lỗi cực kỳ bền bỉ:

* **Phục hồi node bị lỗi:** Nếu một Worker xử lý luồng bị sập, hệ thống sẽ sử dụng đồ thị phả hệ (**RDD Lineage**) để tính toán lại các phần dữ liệu bị mất từ nguồn (ví dụ: đọc lại từ Kafka).
* **Checkpointing:** Spark Streaming cho phép lưu lại trạng thái (state) vào hệ thống lưu trữ bền vững (như HDFS). Nếu toàn bộ hệ thống gặp sự cố, nó có thể khởi động lại và tiếp tục từ vị trí cuối cùng mà không bị mất dữ liệu.


---

Để hiểu sâu hơn về cách **Spark Streaming** xử lý dữ liệu thực tế (như luồng dữ liệu Reddit trong đồ án của bạn), chúng ta sẽ phân tích các khái niệm này theo mô hình "Nhà máy đóng gói".

---

### 1. DStream: Băng chuyền các thùng hàng (RDDs)

**DStream (Discretized Stream)** không phải là một tập dữ liệu tĩnh mà là một lớp trừu tượng đại diện cho một luồng dữ liệu liên tục theo thời gian.

* **Bản chất vật lý:** DStream xem xét luồng dữ liệu như một chuỗi liên tục các **RDD**.
* **Phân đoạn dữ liệu:** Mỗi RDD trong chuỗi này đại diện cho một phân đoạn dữ liệu (một "batch") thu thập được trong một khoảng thời gian cố định.
* **Nguồn gốc:** DStream có thể đến trực tiếp từ nguồn bên ngoài (InputDStream) hoặc là kết quả của các phép biến đổi từ một DStream khác.

---

### 2. Receiver: Người gom hàng và đóng thùng

Đây là thành phần "cửa ngõ" quan trọng nhất để đưa dữ liệu vào Spark.

* **Trách nhiệm:** Mỗi **InputDStream** sẽ có một đối tượng **Receiver** đi kèm.
* **Cơ chế rời rạc hóa:** Receiver nhận dữ liệu thô liên tục từ nguồn (như Kafka), sau đó chia nhỏ chúng thành các **khối (batch)** và lưu vào bộ nhớ.
* **Tạo RDD:** Chính các khối dữ liệu này sau đó sẽ trở thành các RDD thành phần của DStream để Spark Core có thể xử lý.

---

### 3. DStream Operation: Làm việc trên dây chuyền

Mọi logic bạn viết cho DStream thực chất là bạn đang lên kế hoạch cho từng RDD bên trong nó.

* **Chuyển đổi phép toán:** Bất kỳ phép toán nào bạn áp dụng lên DStream đều được Spark tự động chuyển đổi thành các phép toán trên từng RDD thành phần.
* **Ví dụ với `flatMap`:** * Bạn muốn biến luồng các câu văn (sentences) thành luồng các từ (words).
* Phép toán `flatMap` sẽ được thực thi trên **từng RDD** của DStream câu văn.
* Kết quả là một DStream mới chứa các RDD của các từ.



---

### 4. Ví dụ Code minh họa quy trình

Dưới đây là cách các thành phần này phối hợp trong code thực tế:

```python
# 1. Tạo InputDStream (Tự động kích hoạt Receiver bên dưới)
# Dữ liệu đổ về liên tục từ localhost:9999
input_dstream = ssc.socketTextStream("localhost", 9999) #

# 2. DStream Operation (Áp dụng lên mọi RDD thành phần)
# Mỗi RDD câu văn sẽ bị "xé" thành RDD các từ
words_dstream = input_dstream.flatMap(lambda line: line.split(" ")) #

# 3. Output Operation (Action)
words_dstream.pprint()

```

### Tổng kết mối quan hệ:

1. **Dữ liệu thô**  Được **Receiver** nhận và gom thành **Batch** (Lưu trong RAM).
2. **Batch**  Trở thành **RDD** thành phần của **DStream**.
3. **Lệnh xử lý** (như `flatMap`)  Tác động lên **RDD** đó để tạo ra kết quả.

---
## Phân biệt Spark Context và Streaming Context

### 1. Bản chất và Định nghĩa

* **Spark Context (`sc`):**
* Là **trái tim** của bất kỳ ứng dụng Spark nào. Nó thiết lập kết nối đến Cluster Manager (như YARN, Mesos, hoặc Spark Standalone).
* Nó chịu trách nhiệm tạo ra các **RDD** (Resilient Distributed Datasets), các biến tích lũy (accumulators), và các biến quảng bá (broadcast variables).
* Mỗi ứng dụng (Driver) chỉ có duy nhất một `SparkContext`.


* **Streaming Context (`ssc`):**
* Là điểm bắt đầu cho các tính năng **Streaming**. Nó được xây dựng **dựa trên** Spark Context.
* Nó chịu trách nhiệm tạo ra các **DStream** (Discretized Streams) — bản chất là một chuỗi các RDD liên tiếp nhau theo thời gian.
* Nó quản lý việc nhận dữ liệu từ các nguồn (Kafka, Flume, Sockets) và chia nhỏ chúng thành các "batch" (lô) để xử lý.



---

### 2. Mối quan hệ giữa chúng

Mối quan hệ này là mối quan hệ **bao hàm** (Composition). Bạn không thể có `StreamingContext` mà không có `SparkContext`.

> **Công thức khởi tạo thường thấy:**
> `val ssc = new StreamingContext(sparkContext, Seconds(batchInterval))`

---

### 3. Bảng so sánh chi tiết

| Đặc điểm | Spark Context (Core) | Streaming Context (Streaming) |
| --- | --- | --- |
| **Đơn vị dữ liệu** | RDD, DataFrame, Dataset. | DStream (chuỗi các RDD). |
| **Cách thức xử lý** | Batch processing (Xử lý toàn bộ dữ liệu tĩnh cùng lúc). | Micro-batch processing (Xử lý dữ liệu liên tục theo khoảng thời gian nhỏ). |
| **Vòng đời** | Tồn tại suốt quá trình chạy App. | Có thể dừng độc lập hoặc dừng cùng Spark Context. |
| **Nhiệm vụ chính** | Quản lý tài nguyên, lập lịch (Scheduling). | Quản lý nguồn dữ liệu vào (Input Sources) và khoảng thời gian (Batch Interval). |

---

### 4. Lưu ý quan trọng về vận hành (Performance & Stability)

Vì Mạnh đang quan tâm đến kiến trúc hệ thống lớn (Lambda Architecture), hãy lưu ý 2 điểm sau:

1. **Một ssc chỉ dùng một sc:** Một `StreamingContext` luôn liên kết với một `SparkContext`. Tuy nhiên, sau khi bạn đã gọi `ssc.start()`, bạn **không thể** thêm bất kỳ logic tính toán mới nào vào Context đó.
2. **Dừng hệ thống:** Khi bạn dừng `StreamingContext` bằng lệnh `ssc.stop()`, theo mặc định nó cũng sẽ dừng luôn cả `SparkContext`. Nếu bạn muốn giữ lại `SparkContext` để làm việc khác (như lưu kết quả cuối cùng vào DB), bạn phải truyền tham số: `ssc.stop(stopSparkContext = false)`.

### 5. Xu hướng hiện đại (Spark 2.0+)

Hiện nay, trong **Structured Streaming** (phiên bản mới hơn của Spark Streaming), người ta thường dùng **SparkSession**.

* `SparkSession` đóng vai trò là một "unified entry point", thay thế cho cả `SparkContext`, `SQLContext` và tích hợp sẵn khả năng streaming. Nó giúp code của bạn gọn hơn và tối ưu hơn nhờ bộ tối ưu hóa **Catalyst**.

Với dự án Big Data của mình, bạn đang dùng **DStream (Spark Streaming)** hay **Structured Streaming**? Nếu bạn muốn, mình có thể chỉ cho bạn cách chuyển đổi code từ việc dùng `ssc` sang dùng `SparkSession` để tối ưu hiệu năng hệ thống!


---
Trong lập trình Spark, vì dữ liệu được xử lý phân tán trên nhiều máy (Executor) khác nhau, việc chia sẻ dữ liệu giữa Driver và Executor gặp một rào cản: **mỗi Executor hoạt động trên một vùng nhớ riêng.**

Để giải quyết vấn đề này, Spark cung cấp hai loại biến đặc biệt là **Broadcast Variables** và **Accumulators**.

---
## Broadcast Variables vs Accumulators

### 1. Broadcast Variables (Biến quảng bá)

**Mục đích:** Dùng để chia sẻ một tập dữ liệu **chỉ đọc (read-only)** từ Driver tới tất cả các Executor một cách hiệu quả.

* **Cơ chế:** Thay vì gửi một bản sao dữ liệu kèm theo từng tác vụ (task) — điều này gây tốn băng thông nếu bạn có hàng ngàn task — Spark (Driver) sẽ gửi dữ liệu này tới mỗi **nút (Worker/Executor Node)** chỉ **một lần duy nhất**. Dữ liệu sẽ được lưu trong bộ nhớ cache tại đó để các task dùng chung.
* **Ví dụ thực tế:** Bạn có một bảng tra cứu (lookup table) nhỏ về mã bưu điện hoặc danh sách các từ khóa cần lọc (stop-words).
* **Đặc điểm:** * Dữ liệu chỉ đọc, không thể thay đổi sau khi đã quảng bá.
---

### 2. Accumulators (Biến tích lũy)

**Mục đích:** Dùng để thực hiện các phép **cộng dồn (aggregation)** thông tin từ các Executor ngược trở về Driver.

* **Cơ chế:** Các biến này hoạt động theo kiểu "chỉ cộng thêm" (add-only). Các Executor có thể cộng giá trị vào biến này nhưng **không thể đọc** được giá trị hiện tại của nó. Chỉ có chương trình Driver mới có quyền đọc giá trị cuối cùng.
* **Ví dụ thực tế:** Đếm số dòng lỗi (error logs) trong file dữ liệu lớn, hoặc đếm tổng số bản ghi thỏa mãn một điều kiện nào đó trong khi đang xử lý RDD.
* **Đặc điểm:**
* Chỉ Driver mới lấy được kết quả (`accumulator.value`).
* Hoạt động tốt trong các phép toán có tính chất giao hoán và kết hợp (như sum, max, min).


### So sánh nhanh

| Đặc điểm | Broadcast Variables | Accumulators |
| --- | --- | --- |
| **Hướng dữ liệu** | Driver  Executors | Executors  Driver |
| **Mục đích** | Tra cứu thông tin (Read-only) | Đếm hoặc cộng dồn (Write-only tại Executor) |
| **Hiệu năng** | Giảm lưu lượng mạng bằng cách gửi 1 lần/node | Cho phép cập nhật song song từ nhiều worker |


---
## InputDStreams
- InputDStream là một loại DStream đặc biệt dùng để kết nối Spark Streaming với các nguồn dữ liệu bên ngoài (Kafka, Flume, socket, …). Nó chịu trách nhiệm xác định nguồn dữ liệu và tạo ra các RDD mới theo từng batch interval.

---
## Receiver
- Mỗi InputDstream được gán với một đối tượng Receiver. Receiver có nhiệm vụ rời rạc hóa luồng thành các batch, mỗi batch bao gồm các RDD.