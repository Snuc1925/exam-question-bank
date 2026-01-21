# HDFS (Hadoop Distributed File System)

## Overview of HDFS

HDFS là hệ thống lưu trữ phân tán được thiết kế để: 
- Lưu trữ **dữ liệu khổng lồ** một cách rẻ và đáng tin cậy
- Xử lý **file lớn** (từ 100 MB đến vài TB)
- Mô hình **Write once, read many times** (ghi một lần, đọc nhiều lần, chỉ hỗ trợ append)
- Chạy trên **commodity hardware** (phần cứng thông thường, không đắt tiền)
- Cấu trúc thư mục kiểu UNIX (ví dụ: `/hust/soict/hello. txt`)
- Hỗ trợ phân quyền và ownership như UNIX

## HDFS Main Design Principles

### 1. I/O Pattern
- **Append only**: Chỉ cho phép ghi thêm vào cuối file → giảm vấn đề đồng bộ hóa

### 2. Data Distribution
- File được chia thành các **chunks lớn (64 MB)**
  - Giảm kích thước metadata
  - Giảm network communication

### 3. Data Replication
- Mỗi chunk thường được **replicate (sao chép) sang 3 node khác nhau**
- Đảm bảo dữ liệu không bị mất khi có node hỏng

### 4. Fault Tolerance
- **Datanode**: Tự động re-replication khi phát hiện mất dữ liệu
- **Namenode**: Có nhiều cơ chế backup
  - Secondary Namenode
  - Active/Standby Namenodes (HA mode)

## HDFS Architecture

### Kiến trúc Master/Slave

```
┌─────────────────────────────────────┐
│   HDFS Master:  NameNode             │
│   - Quản lý namespace & metadata    │
│   - Giám sát các DataNode           │
└─────────────────────────────────────┘
              │
    ┌─────────┼─────────┐
    │         │         │
┌───▼───┐ ┌──▼────┐ ┌──▼────┐
│DataNode│DataNode│ DataNode│
│Lưu trữ │Lưu trữ │ Lưu trữ │
│chunks  │chunks  │ chunks  │
└────────┘└────────┘└────────┘
```

### NameNode (Master)

**Chức năng chính:**
- Quản lý **File System Namespace** (cây thư mục)
- Map tên file → danh sách blocks
- Map block → các DataNode chứa block đó
- Quản lý cấu hình cluster
- **Replication Engine**: Quyết định khi nào cần replicate blocks

**Metadata được lưu trong RAM:**
- List of files (danh sách file)
- List of Blocks cho mỗi file
- List of DataNodes cho mỗi block
- File attributes (thời gian tạo, replication factor, permissions...)
- **Transaction Log**: Ghi lại mọi thay đổi (tạo/xóa file...)

### DataNode (Slave)

**Vai trò:**
- **Block Server**: Lưu trữ data chunks dưới dạng file trong local filesystem (ext3, ext4...)
- Lưu metadata của block (ví dụ: CRC checksum)
- Phục vụ read/write requests từ clients

**Cơ chế hoạt động:**
- **Block Report**: Định kỳ gửi danh sách các blocks đang lưu cho NameNode
- **Heartbeat**: Gửi tín hiệu "còn sống" mỗi 3 giây
  - NameNode dùng heartbeat để phát hiện DataNode failure
- **Data Pipelining**: Forward data đến các DataNode khác khi replicate

## Data Replication Strategy

### Chunk Placement (Chiến lược đặt bản sao)

Mặc định với **replication factor = 3**:
1. **Replica thứ nhất**:  Trên local node (node đang ghi dữ liệu)
2. **Replica thứ hai**: Trên một remote rack (rack khác)
3. **Replica thứ ba**: Cùng remote rack với replica thứ 2
4. Các replica bổ sung: Đặt ngẫu nhiên

**Lợi ích:**
- Client đọc từ replica gần nhất → giảm latency
- NameNode tự động phát hiện DataNode failure và chọn node mới để re-replicate
- Cân bằng disk usage và network traffic

## Data Rebalance

**Mục đích:** Đảm bảo % disk đầy ở các DataNode tương đồng nhau

**Khi nào chạy:**
- Thường chạy khi thêm DataNode mới vào cluster
- Cluster vẫn online khi Rebalancer hoạt động
- Rebalancer được throttle (giới hạn băng thông) để tránh network congestion

## Data Correctness (Đảm bảo tính toàn vẹn dữ liệu)

**Sử dụng Checksum (CRC32):**

**Khi tạo file:**
- Client tính checksum mỗi 512 bytes
- DataNode lưu trữ checksum

**Khi đọc file:**
- Client lấy data + checksum từ DataNode
- Nếu validation fail → thử đọc từ replica khác

## Data Pipelining (Ghi dữ liệu theo pipeline)

**Quy trình:**
1. Client nhận danh sách DataNodes để đặt replicas
2. Client ghi block vào **DataNode đầu tiên**
3. DataNode thứ nhất **forward data** đến node tiếp theo trong pipeline
4. Khi tất cả replicas được ghi xong → Client chuyển sang block tiếp theo

**Lợi ích:** Giảm network load cho client, tăng throughput

## Namenode High Availability (HA)

### Vấn đề:  Namenode là Single Point of Failure

Nếu Namenode chết → toàn bộ cluster không hoạt động được

### Giải pháp 1: Secondary Namenode (Cũ)

**Vai trò:** Checkpointing (tạo bản snapshot định kỳ)

**Cơ chế:**
1. Copy **FsImage** (snapshot của filesystem) và **Transaction Log** từ NameNode
2. Merge FsImage + Transaction Log → tạo FsImage mới
3. Upload FsImage mới lên NameNode
4. Transaction Log trên NameNode được xóa

**Hạn chế:** Không tự động failover, vẫn có downtime khi NameNode chết

### Giải pháp 2: Active-Standby NameNode (HA Mode)

**Thành phần:**

```
┌──────────────────┐      ┌──────────────────┐
│ Active NameNode  │      │ Standby NameNode │
│ (Đang xử lý)     │      │ (Dự phòng)       │
└────────┬─────────┘      └────────┬─────────┘
         │                         │
         └────────┬────────┬───────┘
                  │        │
         ┌────────▼──┐  ┌──▼─────────┐
         │ Journal   │  │ Zookeeper  │
         │ Nodes (JN)│  │ + ZKFC     │
         └───────────┘  └────────────┘
```

**Active NameNode:**
- Xử lý tất cả client requests (đọc/ghi)
- Ghi mọi thay đổi vào **Journal Nodes**

**Standby NameNode:**
- Ở chế độ chờ (hot standby)
- Liên tục đọc từ Journal Nodes để đồng bộ metadata
- Nhận Block Reports và Heartbeats từ DataNodes

**Cơ chế chia sẻ Edit Logs:**

1. **Quorum Journal Nodes (Phổ biến):**
   - Nhóm JournalNodes lưu trữ phân tán edit logs
   - Active NameNode ghi vào đa số JN (quorum)
   - Standby NameNode đọc từ JN
   - **Ưu điểm**: Tin cậy cao, không cần shared storage đắt tiền

2. **Shared Storage (NFS - Cũ):**
   - Sử dụng ổ đĩa NFS dùng chung
   - **Nhược điểm**: NFS là single point of failure

**Automatic Failover với Zookeeper:**

- **Zookeeper**: Dịch vụ điều phối, quản lý election
- **ZKFC (ZK Failover Controller)**: Process chạy trên mỗi NameNode
  - Theo dõi health của NameNode local
  - Nếu Active NameNode chết → ZKFC báo cho Zookeeper
  - Zookeeper kích hoạt Standby thành Active
  - Đảm bảo chỉ có 1 Active tại một thời điểm (tránh split-brain)

## HDFS CLI Commands

### 1. List & Read (Liệt kê và Xem)

| Lệnh | Chức năng |
|------|-----------|
| `hdfs dfs -ls /` | Liệt kê file/thư mục |
| `hdfs dfs -ls -R /hadoop` | Liệt kê đệ quy |
| `hdfs dfs -cat /path/file` | Hiển thị nội dung file |
| `hdfs dfs -text /path/file` | Hiển thị dạng text (hỗ trợ zip) |

### 2. Upload & Download

| Lệnh | Chức năng |
|------|-----------|
| `hdfs dfs -put [local] [hdfs]` | Upload file lên HDFS |
| `hdfs dfs -put -f [local] [hdfs]` | Upload và ghi đè nếu tồn tại |
| `hdfs dfs -get [hdfs] [local]` | Download file về local |
| `hdfs dfs -copyFromLocal [local] [hdfs]` | Tương tự -put |
| `hdfs dfs -moveFromLocal [local] [hdfs]` | Upload và xóa file local |

### 3. File Management

| Lệnh | Chức năng |
|------|-----------|
| `hdfs dfs -mkdir /path` | Tạo thư mục |
| `hdfs dfs -rm /path/file` | Xóa file |
| `hdfs dfs -rm -r /path` | Xóa thư mục đệ quy |
| `hdfs dfs -cp /src /dest` | Copy trong HDFS |
| `hdfs dfs -mv /src /dest` | Di chuyển trong HDFS |
| `hdfs dfs -touchz /path` | Tạo file rỗng |

### 4. Ownership & Filesystem

| Lệnh | Chức năng |
|------|-----------|
| `hdfs dfs -chmod` | Thay đổi quyền |
| `hdfs dfs -chown` | Thay đổi owner |
| `hdfs dfs -chgrp` | Thay đổi group |
| `hdfs dfs -df -h /` | Xem dung lượng disk |
| `hdfs dfs -du -s /path` | Xem kích thước thư mục |
| `hdfs dfs -checksum /path` | Kiểm tra checksum |

### 5. Administration

| Lệnh | Chức năng |
|------|-----------|
| `hdfs balancer` | Cân bằng dữ liệu giữa các DataNode |
| `hdfs fsck /` | Kiểm tra sức khỏe filesystem |
| `hdfs dfsadmin -safemode leave` | Tắt safe mode |
| `hdfs namenode -format` | Format NameNode (xóa dữ liệu) |

## HDFS Data Formats

### 1. Text File

**Đặc điểm:**
- CSV, TSV, JSON records
- Human-readable, dễ đọc và parse
- Dễ trao đổi giữa các ứng dụng

**Hạn chế:**
- Không hỗ trợ block compression
- Không hiệu quả khi query
- Chỉ tốt cho giai đoạn đầu, không phù hợp production

### 2. Sequence File

**Đặc điểm:**
- Lưu trữ **binary key-value pairs**
- **Row-based** format
- Thường dùng để chuyển data giữa các MapReduce jobs
- Có thể dùng để archive các file nhỏ trong Hadoop

**Ưu điểm:**
- Hỗ trợ **compression**
- **Splittable**:  Có thể split ngay cả khi đã nén

### 3. Avro

**Đặc điểm:**
- **Row-based** format
- Schema (JSON) được nhúng trong file
- Hỗ trợ compression và splitting
- Binary và JSON serialization

**Data types:**
- Primitive:  null, boolean, int, long... 
- Complex: records, arrays, maps... 

**Ví dụ schema:**
```json
{
  "type": "record",
  "name": "tweets",
  "fields": [
    {"name": "username", "type": "string"},
    {"name": "tweet", "type": "string"},
    {"name": "timestamp", "type": "long"}
  ]
}
```

**Ưu điểm:**
- Flexible schema (schema linh hoạt, có thể evolve)
- Data corruption detection

### 4. Parquet

**Đặc điểm:**
- **Column-oriented** binary format
- Hiệu quả cho disk I/O khi query cột cụ thể
- Hỗ trợ **page compression** và splitting
- Hỗ trợ **nested columns** (Dremel encoding)

**Use case:** Phù hợp khi thường xuyên query một vài cột trong bảng lớn

### 5. ORC (Optimized Row Columnar)

**Đặc điểm:**
- Lưu trữ **collections of rows**, trong mỗi collection data được lưu theo **columnar format**
- **Block-mode compression**
- Có **lightweight indexing** → skip các blocks không liên quan

**Ưu điểm:**
- Mỗi column được compress riêng trong row group
- **Splittable**:  Cho phép xử lý parallel
- Có **indices with aggregated values**:  min, max, sum, count cho mỗi cột
- Hỗ trợ ordered data store (trong một stripe)

**Use case:** Tối ưu cho Hive queries, phù hợp data warehouse

---

## So sánh các Data Format

| Format | Layout | Compression | Splittable | Use Case |
|--------|--------|-------------|------------|----------|
| Text | Row | ✗ | ✓ | Development, data exchange |
| Sequence | Row | ✓ | ✓ | MapReduce intermediate data |
| Avro | Row | ✓ | ✓ | Schema evolution, streaming |
| Parquet | Column | ✓ | ✓ | Analytics (read specific columns) |
| ORC | Column | ✓ | ✓ | Hive, complex analytics |

**Lựa chọn format:**
- **Text**: Giai đoạn đầu, dễ debug
- **Avro**:  Cần schema linh hoạt, streaming data
- **Parquet/ORC**: Analytics, query columnar, production workloads