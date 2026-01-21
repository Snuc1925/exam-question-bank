# Chương 2: File Management

## 1. Distributed File System (DFS)

### 1.1 Định nghĩa và Lợi ích

**File system:** Abstraction of storage devices (Trừu tượng hóa các thiết bị lưu trữ)

**Distributed file system:** Available to remote processes in distributed systems (Có sẵn cho các tiến trình từ xa trong hệ thống phân tán)

**Lợi ích:**
- File sharing (Chia sẻ tệp tin)
- Uniform view of system from different clients (Tầm nhìn thống nhất về hệ thống từ các máy khách khác nhau) - **Tính minh bạch về vị trí (Location Transparency)**
- Centralized administration (Quản trị tập trung)

---

## 2. Tính Minh Bạch (Transparency)

Trong hệ thống tệp phân tán (DFS), **Tính minh bạch (Transparency)** là mục tiêu quan trọng nhất để tạo ra trải nghiệm người dùng liền mạch.

### 2.1 Tính minh bạch mạng/truy cập (Network/Access Transparency)

Đây là khả năng làm cho mạng trở nên "vô hình" đối với người dùng. 

- **Trải nghiệm:** Bạn mở một tệp tin trên máy chủ cách xa hàng ngàn km bằng thao tác nhấn đúp chuột (double-click) y hệt như đang mở một tệp trên ổ cứng của chính mình. 
- **Đặc điểm:** Người dùng không cần quan tâm đến các giao thức mạng phức tạp bên dưới.  Hệ thống tự động xử lý việc kết nối và truyền tải. 

### 2.2 Hai cấp độ của Tính minh bạch vị trí

#### 2.2.1 Tính minh bạch vị trí (Location Transparency)

- **Định nghĩa:** Tên tệp tin không chứa thông tin về vị trí vật lý của nó.
- **Ví dụ:** Bạn truy cập tệp qua đường dẫn `\\CompanyShared\Reports\2023. pdf`
  - Tên tệp này không cho bạn biết nó đang nằm ở máy chủ tại Hà Nội hay TP.HCM, hay nằm trên ổ đĩa C hay D. 
- **Hạn chế:** Nếu quản trị viên di chuyển tệp này sang một máy chủ khác, bạn có thể phải thay đổi đường dẫn truy cập nếu hệ thống chỉ dừng lại ở mức độ này.

#### 2.2.2 Tính độc lập vị trí (Location Independence)

- **Định nghĩa:** Đây là cấp độ cao hơn.  Tệp tin có thể được di chuyển tự do giữa các thiết bị lưu trữ vật lý mà **không làm thay đổi tên gọi hoặc đường dẫn** mà người dùng sử dụng.
- **Cơ chế:** Hệ thống sử dụng một bản đồ ánh xạ (mapping) giữa "Tên logic" và "Địa chỉ vật lý".  Khi tệp di chuyển, chỉ có bản đồ này thay đổi, tên tệp vẫn giữ nguyên.
- **Lợi ích:** Cho phép quản trị viên bảo trì hệ thống hoặc thay thế ổ cứng cũ mà không làm gián đoạn công việc của người dùng.

#### 2.2.3 Mối quan hệ giữa hai cấp độ

**"Độc lập vị trí → Minh bạch vị trí, nhưng ngược lại thì không chắc"**

1. **Độc lập → Minh bạch:** Nếu bạn có thể di chuyển tệp mà không cần đổi tên (Độc lập), thì hiển nhiên cái tên đó không hề chứa thông tin về vị trí vật lý (Minh bạch).
2. **Minh bạch ↛ Độc lập:** Một hệ thống có thể có tên tệp "minh bạch" (không lộ vị trí), nhưng tên đó lại bị "chết" (static) với một vị trí cụ thể.  Nếu bạn chuyển tệp đi nơi khác, đường dẫn cũ sẽ bị hỏng (broken link). Lúc này, nó có tính minh bạch nhưng thiếu tính độc lập.

### 2.3 Cơ chế thực hiện:  Naming & Mounting

- **Naming (Đặt tên):** Tạo ra một không gian tên thống nhất (Unified Namespace) cho toàn bộ tổ chức.
- **Mounting (Gắn kết):** Kỹ thuật "gắn" một thư mục từ máy chủ từ xa vào một thư mục cục bộ trên máy khách, khiến nó trông như một phần của ổ đĩa địa phương.

---

## 3. Tính Sẵn Sàng (Availability)

**Tính sẵn sàng (Availability)** là mục tiêu then chốt để đảm bảo hệ thống luôn hoạt động ngay cả khi có sự cố xảy ra.

### 3.1 Định nghĩa

Dữ liệu phải luôn trong trạng thái có thể truy cập được một cách dễ dàng và nhanh chóng bất cứ khi nào người dùng hoặc ứng dụng cần đến.

### 3.2 Các yếu tố không được làm ảnh hưởng đến Availability

Một hệ thống có tính sẵn sàng cao phải "miễn nhiễm" trước 3 yếu tố sau:

- **Số lượng người dùng tăng đột biến:** Khi có quá nhiều người truy cập cùng lúc, hệ thống không được phép bị treo hay sập (khả năng mở rộng - scalability).
- **Lỗi hệ thống (System failures):** Nếu một máy chủ bị hỏng ổ cứng hoặc mất điện, người dùng vẫn phải truy cập được tệp tin đó từ một nguồn khác.
- **Hệ quả của việc phân tán:** Việc dữ liệu nằm rải rác trên mạng có thể gây ra độ trễ hoặc mất kết nối, nhưng hệ thống phải có cơ chế để người dùng không cảm nhận thấy sự gián đoạn này.

### 3.3 Giải pháp:  Nhân bản (Replication)

Cơ chế chính để đạt được tính sẵn sàng cao là **Replication**. 

- **Cách hoạt động:** Thay vì chỉ lưu một bản duy nhất, hệ thống sẽ tạo ra nhiều bản sao (replicas) của cùng một tệp tin và lưu trữ chúng trên các máy chủ (nodes) khác nhau.
- **Lợi ích:**
  - **Chống lỗi (Fault Tolerance):** Nếu Máy chủ A chết, hệ thống lập tức chuyển hướng yêu cầu của người dùng sang Máy chủ B (nơi có bản sao).
  - **Cân bằng tải (Load Balancing):** Nếu 1. 000 người cùng truy cập một tệp, hệ thống có thể chia 500 người sang máy chủ này và 500 người sang máy chủ kia để giảm tải. 

---

## 4. Kiến Trúc Hệ Thống Tệp Phân Tán

Có hai mô hình chính để tổ chức cách các máy tính tương tác và lưu trữ dữ liệu. 

### 4.1 Kiến trúc Client-Server (Khách - Chủ)

Đây là mô hình phổ biến nhất, trong đó có sự phân biệt rõ ràng về vai trò giữa các máy tính. 

#### Cơ chế hoạt động: 
- **Máy chủ (File Servers):** Một hoặc nhiều máy chuyên dụng giữ nhiệm vụ quản lý toàn bộ hệ thống tệp.  Dữ liệu thực tế được lưu trữ trên đĩa cứng của các máy chủ này. 
- **Máy khách (Clients):** Gửi yêu cầu (như đọc, ghi, xóa tệp) đến máy chủ. Máy khách không trực tiếp sở hữu tệp. 

#### Đặc điểm:
- Tập trung hóa việc lưu trữ và quản lý (Centralized)
- Giúp việc bảo mật và kiểm soát trở nên dễ dàng hơn
- Có thể tạo ra "điểm nghẽn" nếu máy chủ quá tải

#### Ví dụ điển hình:
- **NFS (Sun Microsystems):** Giao thức phổ biến để chia sẻ tệp trong mạng nội bộ.
- **GFS (Google File System):** Hệ thống tệp khổng lồ của Google, sử dụng một cụm máy chủ để lưu trữ dữ liệu tìm kiếm và dịch vụ. 

### 4.2 Kiến trúc Đối xứng (Symmetric / Peer-to-Peer)

Mô hình này xóa bỏ ranh giới giữa máy chủ và máy khách. 

#### Cơ chế hoạt động:
- **Phi tập trung hoàn toàn (Fully decentralized):** Mọi nút (node) trong mạng đều có vai trò như nhau.  Mỗi máy tính vừa là máy khách (yêu cầu dữ liệu) vừa là máy chủ (cung cấp dữ liệu cho máy khác).
- **Công nghệ P2P:** Dựa trên các giao thức mạng ngang hàng để tìm kiếm và truyền tải tệp.

#### Đặc điểm:
- Không có điểm quản lý tập trung
- Khả năng chịu lỗi cực cao (nếu một máy sập, dữ liệu vẫn còn ở các máy khác)
- Khả năng mở rộng rất tốt

#### Ví dụ điển hình:
- **Ivy:** Một hệ thống tệp đọc-ghi ngang hàng sử dụng cấu trúc **Chord DHT** (Bảng băm phân tán) để định vị dữ liệu trong mạng mà không cần máy chủ điều phối.

---

## 5. Sự Phát Triển của Công Nghệ Lưu Trữ

### 5.1 Direct Attached Storage (DAS) - Lưu trữ gắn trực tiếp

#### Cấu trúc:
- Thiết bị lưu trữ (Block Storage) được kết nối trực tiếp vào máy chủ (Server) thông qua cáp vật lý. 

#### Đặc điểm:
- Hệ thống tệp (File System) và khối lưu trữ (Block Storage) nằm cùng một chỗ bên trong máy chủ.
- **Hạn chế:** Chỉ máy chủ đó mới truy cập được dữ liệu.  Việc chia sẻ dữ liệu giữa các máy chủ rất khó khăn và tốn kém khi mở rộng quy mô.

### 5.2 Network Attached Storage (NAS) - Lưu trữ gắn qua mạng

NAS ra đời để giải quyết vấn đề chia sẻ dữ liệu. 

#### Cấu trúc:
- Ứng dụng truy cập dữ liệu thông qua mạng IP (Ethernet).

#### Đặc điểm:
- Máy chủ đóng vai trò là một **File Server**
- Nhận các yêu cầu **File I/O** từ khách hàng (Clients) qua mạng IP
- Máy chủ NAS tự quản lý hệ thống tệp của riêng nó và chuyển đổi các yêu cầu tệp thành các lệnh **Block I/O** để đọc/ghi xuống ổ đĩa
- **Lợi ích:** Cho phép nhiều người dùng và thiết bị khác nhau chia sẻ tệp tin một cách đồng nhất.

### 5.3 Storage Area Network (SAN) - Mạng lưu trữ chuyên dụng

SAN là một mạng lưới tốc độ cao riêng biệt, tách rời hoàn toàn việc lưu trữ ra khỏi máy chủ ứng dụng.

#### Cấu trúc: 
- Sử dụng mạng chuyên dụng (thường là **Fibre Channel - FC** hoặc **iSCSI**) để kết nối giữa máy chủ và thiết bị lưu trữ.

#### Đặc điểm:
- Hệ thống tệp (File System) giờ đây nằm tại máy chủ ứng dụng, nhưng khối lưu trữ (Block Storage) lại nằm ở một máy chủ lưu trữ (Storage Server) riêng biệt.
- Khách hàng (Clients) gửi yêu cầu **Metadata** (dữ liệu quản lý) đến máy chủ, nhưng việc truyền tải **Dữ liệu thực tế (Data)** diễn ra trực tiếp giữa máy khách và thiết bị lưu trữ qua mạng SAN. 
- **Lợi ích:** Hiệu suất cực cao, độ trễ thấp và khả năng mở rộng không giới hạn, phù hợp cho các cơ sở dữ liệu lớn.

---

## 6. Object Storage Device (OSD) và Object-based File System

### 6.1 Thiết bị lưu trữ đối tượng (Object Storage Device - OSD)

Khác với các ổ đĩa truyền thống chỉ lưu trữ các "khối" (blocks) dữ liệu vô tri, OSD là một thiết bị lưu trữ thông minh. 

#### Đặc điểm:
- **Lưu trữ Đối tượng:** OSD giữ các đối tượng (objects) thay vì các khối.  Các đối tượng này tương tự như các tệp tin trong một hệ thống tệp đơn giản.
- **Định danh:** Mỗi đối tượng được xác định bằng một ID đối tượng (OID) 64-bit.
- **Tính linh hoạt:** Các đối tượng có độ dài thay đổi và được tạo hoặc giải phóng một cách linh động. 
- **Khả năng tự quản lý:** OSD tự quản lý việc phân bổ không gian cho các đối tượng.  Nó không "ngớ ngẩn" như các ổ đĩa lưu trữ thông thường (vốn chỉ biết đọc/ghi khối theo lệnh từ máy chủ).

### 6.2 So sánh OSD với Ổ đĩa truyền thống

| Đặc điểm | Lưu trữ bằng Đĩa (Disk) | Lưu trữ bằng Đối tượng (OSD) |
|----------|-------------------------|------------------------------|
| **Cấu trúc** | Mảng các khối (blocks) cố định | Nhiều đối tượng với kích thước thay đổi |
| **Thao tác** | Đọc khối, ghi khối, định dạng (format) | Đọc/ghi đối tượng, tạo đối tượng, liệt kê đối tượng |
| **Bảo mật** | Phân vùng (Zoning) và che giấu toàn bộ đĩa | Bảo mật trên từng đối tượng bằng các Quyền (Capabilities) |
| **Vận chuyển** | FC SCSI và iSCSI | FC SCSI, iSCSI và RPC |

### 6.3 Hệ thống tệp dựa trên đối tượng (Object-based File System)

Trong kiến trúc này, quản lý lưu trữ được đẩy bớt (offload) từ hệ thống tệp truyền thống xuống thiết bị OSD.

#### Đặc điểm:
- **Truy cập trực tiếp:** Máy khách (Clients) có quyền truy cập trực tiếp vào kho lưu trữ để đọc và ghi dữ liệu tệp một cách bảo mật.
- **Metadata Server (MDS):** Máy chủ tệp đóng vai trò là máy chủ siêu dữ liệu (MDS). Nó quản lý vị trí của dữ liệu, nhưng không tham gia trực tiếp vào việc truyền tải dữ liệu giữa máy khách và OSD.
- **Khả năng mở rộng tốt hơn:** Hệ thống tệp bao gồm nhiều OSD, giúp tăng hiệu suất khi quy mô dữ liệu lớn. 
- **Lưu trữ hợp nhất (Storage Pooling):** Nhiều hệ thống tệp khác nhau có thể chia sẻ chung các OSD.

### 6.4 So sánh với NAS và SAN

- **So với NAS:** Trong NAS, máy khách yêu cầu theo mức độ **Tệp (File I/O)** và máy chủ NAS phải xử lý cả Metadata lẫn dữ liệu thực tế.  Trong hệ thống đối tượng, máy khách tự xử lý dữ liệu với OSD sau khi lấy Metadata từ MDS.
- **So với SAN:** SAN hoạt động ở mức độ **Khối (Block I/O)**. Hệ thống tệp đối tượng thông minh hơn vì nó hiểu về "đối tượng", cho phép quản lý không gian và bảo mật tốt hơn ngay tại mức thiết bị lưu trữ thay vì phụ thuộc hoàn toàn vào máy chủ.

---

## 7. Metadata Server (MDS)

**Metadata Server (MDS)** giống như một **"Người quản thư"** trong một thư viện khổng lồ nhưng không trực tiếp đi lấy sách cho bạn. 

### 7.1 Metadata là gì?  (Dữ liệu về dữ liệu)

Metadata không phải là nội dung thực tế của tệp, mà là các thông tin quản trị: 

- **Cấu trúc phân cấp:** Tên tệp, thư mục mẹ, sơ đồ cây thư mục
- **Thuộc tính:** Kích thước tệp, thời gian tạo, thời gian chỉnh sửa lần cuối
- **Quyền truy cập:** Ai có quyền đọc, ghi hoặc xóa (ACL - Access Control List)
- **Bản đồ vị trí (Quan trọng nhất):** Tệp tin này được chia nhỏ thành những "đối tượng" (objects) nào và các đối tượng đó đang nằm ở những thiết bị OSD nào

### 7.2 Quy trình điều phối của MDS

Trong kiến trúc truyền thống (như NAS), mọi thứ đều đi qua máy chủ.  Nhưng với MDS, quy trình được tách đôi để tăng tốc: 

1. **Bước 1: Yêu cầu mở tệp**
   - Client (máy khách) gửi yêu cầu tới MDS:  *"Tôi muốn đọc tệp 'Bao_cao_2024.pdf'"*

2. **Bước 2: Kiểm tra và Cấp phép**
   - MDS kiểm tra xem Client có quyền đọc không.  Nếu có, MDS không gửi tệp đó cho Client.  Thay vào đó, nó gửi: 
     - Danh sách các **Object ID** cấu thành nên tệp đó
     - Vị trí các **OSD** đang chứa các object này
     - Một **"Chìa khóa bảo mật" (Capability/Token)** để Client có thể "nói chuyện" trực tiếp với OSD

3. **Bước 3: Truy cập trực tiếp**
   - Client mang "chìa khóa" và danh sách ID đến thẳng các OSD
   - OSD kiểm tra chìa khóa và trả dữ liệu trực tiếp cho Client

### 7.3 Tại sao cần tách riêng Metadata Server?

#### a.  Loại bỏ "Nút thắt cổ chai" (Bottleneck)
Trong các hệ thống cũ, máy chủ tệp vừa phải xử lý logic (metadata) vừa phải vận chuyển dữ liệu (data). Khi có hàng ngàn Client truy cập, máy chủ sẽ bị quá tải.  MDS giải quyết việc này bằng cách đứng ngoài luồng vận chuyển dữ liệu nặng nề.

#### b. Khả năng mở rộng cực lớn (Scalability)
- Nếu dữ liệu tăng lên:  Bạn chỉ cần mua thêm các ổ OSD rẻ tiền
- Nếu số lượng yêu cầu tìm kiếm tăng lên:  Bạn có thể nâng cấp cụm MDS (Cluster) mà không ảnh hưởng đến các ổ lưu trữ

#### c. Quản lý lưu trữ thông minh (Storage Pooling)
MDS cho phép nhiều hệ thống tệp khác nhau cùng chia sẻ một "bể" lưu trữ OSD bên dưới. Nó giống như việc nhiều khoa trong một trường đại học dùng chung một kho sách, nhưng mỗi khoa có một người quản thư riêng để quản lý danh mục của mình.

### 7.4 So sánh với hệ thống truyền thống

| Đặc điểm | Máy chủ tệp truyền thống (NFS/SMB) | Metadata Server (MDS) |
|----------|-------------------------------------|------------------------|
| **Vai trò** | Làm tất cả (Quản lý + Vận chuyển) | Chỉ quản lý danh mục và điều phối |
| **Luồng dữ liệu** | Client ↔ Server ↔ Disk | Client ↔ OSD (MDS chỉ đứng ngoài chỉ đường) |
| **Khi tệp cực lớn** | Server dễ bị treo do băng thông quá tải | MDS vẫn hoạt động nhẹ nhàng vì tệp lớn hay nhỏ nó vẫn chỉ gửi "bản đồ" |

**Tóm lại:** MDS là **"bộ não"** của hệ thống.  Nó biết mọi thứ nằm ở đâu và ai được phép lấy, nhưng nó nhường công việc "khuân vác" dữ liệu cho các OSD và Client để tối ưu hiệu suất.

---

## 8. Các Vấn Đề Thiết Kế trong DFS

### 8.1 Đặt tên và Giải quyết tên (Naming and Name Resolution)

Để truy cập tệp, hệ thống cần một cơ chế để chuyển đổi tên tệp (logic) sang địa chỉ vật lý (vị trí thực).

#### Khái niệm:
- **Không gian tên (Name space):** Là một tập hợp các tên tệp được hệ thống quản lý
- **Giải quyết tên (Name resolution):** Quá trình ánh xạ một tên tệp cụ thể tới một đối tượng (tệp tin thực tế)

#### 3 phương pháp truyền thống: 

1. **Ghép tên máy chủ (Concatenation)**
   - Tên tệp bao gồm tên máy chủ chứa nó (ví dụ: `ServerA:/Folder/file.txt`)
   - Cách này làm lộ vị trí vật lý

2. **Gắn kết thư mục (Mounting)**
   - Gắn các thư mục từ xa vào cây thư mục cục bộ của máy khách
   - Người dùng truy cập như tệp địa phương

3. **Thư mục toàn cầu duy nhất (Single global directory)**
   - Tất cả các tệp trong toàn hệ thống được tổ chức trong một cấu trúc cây duy nhất
   - Không phụ thuộc vào vị trí máy chủ

### 8.2 Ngữ nghĩa chia sẻ tệp (File Sharing Semantics)

Vấn đề nảy sinh khi có nhiều người cùng đọc/ghi một tệp cùng lúc.  Hệ thống cần quy định thứ tự và tính nhất quán (Consistency) của dữ liệu.

| Loại ngữ nghĩa | Đặc điểm chính |
|----------------|----------------|
| **UNIX semantics** | Mọi thay đổi từ lệnh ghi (write) đều có hiệu lực ngay lập tức.  Những người khác đang mở tệp sẽ thấy dữ liệu mới ngay.  |
| **Session semantics** | Thay đổi chỉ có hiệu lực cục bộ trong "phiên" làm việc đó. Sau khi đóng tệp (close), các thay đổi mới được cập nhật lên server cho các phiên sau thấy. |
| **Immutable-Shared-Files** | Tệp đã chia sẻ thì không thể sửa đổi. Muốn sửa phải tạo tệp mới với tên mới.  Rất dễ triển khai. |
| **Transactions** | Tuân thủ tính chất "tất cả hoặc không" (all-or-nothing). Các thao tác đọc/ghi được nhóm lại để đảm bảo tính toàn vẹn. |

### 8.3 Cơ chế Caching (Bộ nhớ đệm)

Caching giúp tăng tốc độ truy cập bằng cách lưu tạm dữ liệu gần người dùng hơn.

#### Các loại Caching:

1. **Server caching (Caching tại Server)**
   - Lưu dữ liệu trên RAM của máy chủ
   - Giúp giảm truy xuất đĩa nhưng vẫn tốn độ trễ mạng
   - Vấn đề quản lý: bao nhiêu cache, chiến lược thay thế
   - Được sử dụng trong các máy chủ tìm kiếm web hiệu suất cao

2. **Client caching in main memory (Caching tại Client trên RAM)**
   - Rất nhanh, phù hợp cho máy trạm không ổ cứng (diskless workstation)
   - Nhanh hơn khi truy cập từ bộ nhớ chính so với đĩa
   - **Hạn chế:** Chiếm không gian của bộ nhớ ảo (compete with virtual memory)

3. **Client-cache on a local disk (Caching tại Client trên đĩa cục bộ)**
   - Cho phép lưu tệp lớn hơn
   - Quản lý bộ nhớ ảo đơn giản hơn
   - Máy trạm có thể làm việc ngay cả khi mất kết nối mạng

#### Lợi ích của Caching:

- **Giảm truy cập từ xa:** Giảm thiểu số lượng các yêu cầu phải gửi qua mạng, từ đó làm giảm lưu lượng băng thông (network traffic) và giảm tải cho máy chủ (server load)
- **Tối ưu hóa chi phí mạng:** Tổng chi phí truyền tải mạng đối với các khối dữ liệu lớn (thông qua cơ chế caching) sẽ thấp hơn so với việc gửi một loạt các phản hồi cho từng yêu cầu nhỏ lẻ
- **Tối ưu hóa truy xuất đĩa:** Việc đọc/ghi các khối dữ liệu lớn trong bộ đệm giúp hệ thống tối ưu hóa truy cập đĩa tốt hơn so với việc đọc các khối đĩa ngẫu nhiên (random disk blocks)

#### Thách thức của Caching:

- **Vấn đề nhất quán bộ đệm (Cache-consistency):** Đây là nhược điểm lớn nhất.  Khi dữ liệu được lưu ở nhiều nơi (nhiều máy khách khác nhau), việc đảm bảo tất cả mọi người đều thấy phiên bản mới nhất là rất khó khăn.
- **Chi phí quản lý cao:** Nếu hệ thống có các thao tác ghi (writes) xảy ra thường xuyên, chi phí tài nguyên (overhead) để giải quyết vấn đề nhất quán dữ liệu sẽ trở nên rất lớn và đáng kể. 

#### Bảng tóm tắt sự đánh đổi:

| Yếu tố | Tác động khi có Caching |
|--------|-------------------------|
| **Tốc độ truy cập** | Tăng đáng kể do dữ liệu nằm gần người dùng hơn |
| **Băng thông mạng** | Tiết kiệm hơn nhờ giảm các yêu cầu lặp lại |
| **Tính chính xác dữ liệu** | Rủi ro cao (dễ đọc phải dữ liệu cũ nếu không được cập nhật kịp thời) |
| **Độ phức tạp hệ thống** | Tăng lên do phải triển khai các giao thức kiểm soát nhất quán |

### 8.4 Nhân bản (Replication)

Nhân bản là việc lưu trữ các bản sao của tệp trên nhiều máy chủ khác nhau.

#### Mục tiêu:

- **Tăng độ tin cậy (Reliability):** Tránh mất dữ liệu
- **Cải thiện tính sẵn sàng (Availability):** Nếu một máy chủ hỏng, máy khác vẫn phục vụ được
- **Cân bằng tải (Load balancing):** Chia sẻ lưu lượng truy cập giữa các máy chủ

#### Thách thức thiết kế:

- Làm sao để việc nhân bản là **minh bạch (transparent)** đối với người dùng (họ không cần biết mình đang đọc bản sao nào)?
- Làm sao để giữ các bản sao **nhất quán (consistent)** khi có sự cố mạng hoặc lỗi máy chủ khiến một bản sao không được cập nhật kịp thời? 

---

## Tóm tắt

Chương này đã trình bày các khái niệm cơ bản và nâng cao về quản lý tệp trong hệ thống phân tán, bao gồm:

- Các mục tiêu thiết kế chính:  Tính minh bạch, tính sẵn sàng, khả năng mở rộng
- Các kiến trúc khác nhau: Client-Server vs P2P
- Sự phát triển của công nghệ lưu trữ: DAS → NAS → SAN → Object Storage
- Vai trò quan trọng của Metadata Server trong kiến trúc hiện đại
- Các thách thức thiết kế:  Naming, File Sharing Semantics, Caching, và Replication

Những kiến thức này là nền tảng để hiểu và thiết kế các hệ thống lưu trữ phân tán quy mô lớn trong thực tế. 