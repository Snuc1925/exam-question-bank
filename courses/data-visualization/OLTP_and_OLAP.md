# Data Modeling and Databases:  OLTP & OLAP

## Data Integration (Tích hợp dữ liệu)

### Why Data Integration?  (Tại sao cần tích hợp dữ liệu?)

Tích hợp dữ liệu là quá trình kết hợp dữ liệu từ nhiều nguồn khác nhau để cung cấp cái nhìn thống nhất. 

**Lợi ích:**
- **Single point of access**:  Điểm truy cập thông tin duy nhất, đơn giản hóa việc tìm kiếm và tái sử dụng
- **Comprehensive database**: Cơ sở dữ liệu toàn diện từ các hệ thống bổ trợ nhau
- **Better decision making**: Cải thiện quá trình ra quyết định dựa trên dữ liệu tập trung và chính xác
- **Improved customer experience**: Cái nhìn 360° về khách hàng từ nhiều nguồn (sales, support, marketing)
- **Competitive advantage**: Tăng năng lực cạnh tranh và tối ưu hóa vận hành
- **Increased productivity**: Tăng năng suất lao động, giảm thời gian đối soát thủ công
- **Forecasting**: Dự báo tương lai từ dữ liệu tích hợp

### Data Integration Challenges (Thách thức tích hợp dữ liệu)

#### 1. Physical Systems (Hệ thống vật lý)
- **Hardware diversity**: Đa dạng phần cứng và tiêu chuẩn kết nối không đồng nhất
- **Distributed deployment**: Dữ liệu phân tán ở nhiều vị trí địa lý hoặc cloud platforms khác nhau
- **Data format diversity**: Khác biệt giữa structured (SQL), semi-structured (XML, JSON) và unstructured data (images, text)

#### 2. Logical Structures (Cấu trúc logic)
- **Different data models**: Mô hình quan hệ, đồ thị, hướng đối tượng... 
- **Schema differences**: Cùng thông tin nhưng khác độ dài, kiểu dữ liệu, cách đặt tên ở các bảng khác nhau

#### 3. Business Organization (Tổ chức kinh doanh)
- **Security and privacy**: Rủi ro bảo mật tăng khi gộp dữ liệu
- **Business rules**: Logic nghiệp vụ khác nhau giữa các bộ phận, đôi khi xung đột
- **Administrative domains**: Chi nhánh/khu vực có quy trình quản lý và lưu trữ độc lập

## Data Warehouse (Kho dữ liệu)

### Definition (Định nghĩa)

Data Warehouse là kho lưu trữ duy nhất, đầy đủ và nhất quán, tổng hợp dữ liệu từ nhiều nguồn khác nhau để người dùng cuối có thể hiểu và sử dụng trong ngữ cảnh kinh doanh.

**Đặc điểm:**
- Bản sao của dữ liệu giao dịch được cấu trúc lại đặc biệt
- Tối ưu cho **query và analysis**, không phải transaction processing
- Dữ liệu từ operational systems (OLTP) qua quy trình **ETL (Extract, Transform, Load)**

### Data Warehouse Usage (Ứng dụng)

**1. Information Processing (Xử lý thông tin):**
- Truy vấn cơ bản, thống kê
- Báo cáo qua bảng biểu, biểu đồ

**2. Analytical Processing (OLAP):**
- Phân tích đa chiều
- Slice-dice, drilling, pivoting

**3. Data Mining (Khai phá dữ liệu):**
- Tìm quy luật ẩn
- Xây dựng mô hình dự báo, phân loại
- Trực quan hóa kết quả

### Business Benefits (Lợi ích kinh doanh)

**Lợi ích:**
- Hiệu suất truy vấn cao cho complex queries
- Không ảnh hưởng đến hoạt động của operational systems (OLTP)

**Các câu hỏi kinh doanh được giải quyết:**
- Nhóm khách hàng nào mang lại lợi nhuận cao nhất/thấp nhất?
- Khách hàng nào có khả năng churn (rời bỏ sang đối thủ)?
- Chương trình khuyến mãi nào có tác động lớn nhất đến doanh thu?
- Kênh phân phối nào hiệu quả nhất?

### Four Characteristics of Data Warehouse (4 đặc tính cốt lõi)

Theo W. H. Inmon:

#### 1. Subject-Oriented (Hướng chủ đề)

Tổ chức xung quanh các **chủ đề nghiệp vụ** thay vì quy trình vận hành. 

- **Focus on entities**: Khách hàng, Sản phẩm, Bán hàng, Marketing
- **Decision support**: Loại bỏ dữ liệu không cần thiết cho phân tích
- **Concise view**: Cái nhìn tập trung vào chủ đề cụ thể

#### 2. Integrated (Tính tích hợp)

Đặc tính quan trọng nhất - dữ liệu từ nhiều nguồn được đưa về **định dạng chung duy nhất**.

- **Unified format**: Nhất quán về naming, encoding, đơn vị đo lường
  - Ví dụ: Quy đổi mọi tiền tệ về USD, thống nhất format ngày tháng
- **Data cleansing**: Làm sạch dữ liệu trước khi nạp vào kho
- **Example**: Tích hợp giá khách sạn từ nhiều nguồn → quy đổi chung tiền tệ, cách tính thuế, dịch vụ đi kèm

#### 3. Time-Variant (Biến đổi theo thời gian)

Dữ liệu luôn gắn với **yếu tố thời gian** để phân tích xu hướng.

- **Historical data**: Lưu lịch sử dài hạn (5-10 năm), không chỉ giá trị hiện tại
- **Time in key**: Mọi key structure đều chứa yếu tố thời gian (trực tiếp/gián tiếp)
- **Periodic updates**: Dữ liệu nạp theo chu kỳ (daily, hourly) và không thay đổi sau khi nạp

#### 4. Non-volatile (Không biến động)

Dữ liệu **bất biến** sau khi được nạp vào. 

- **Read-only**: Người dùng chỉ có quyền đọc, không sửa/xóa dữ liệu lịch sử
- **No Update/Delete**: Loại bỏ thao tác Update, Delete, Insert thủ công
- **Two operations only**: Loading và Access/Reading
- **Simplified management**: Không cần cơ chế phức tạp về transaction control, recovery, concurrency control

## ETL Process (Quy trình ETL)

### Definition

ETL là "xương sống" của Data Warehouse, di chuyển và chuẩn hóa dữ liệu. 

```
Operational Systems → Extract → Transform → Load → Data Warehouse
```

**Extract (Trích xuất):** Lấy dữ liệu từ source systems hiệu quả nhất

**Transform (Chuyển đổi):** Tính toán, định dạng lại dữ liệu phù hợp yêu cầu phân tích

**Load (Nạp):** Đưa dữ liệu đã xử lý vào target storage (Data Warehouse)

### Why ETL is Important? 

- **Added value**: Loại bỏ sai sót, sửa đổi dữ liệu cho đúng
- **Consolidation**: Điều chỉnh dữ liệu từ nhiều nguồn để sử dụng cùng nhau
- **Availability**: Cấu trúc cho BI tools và các bước phân tích tiếp theo
- **Reliability**: Đo lường và tài liệu hóa độ tin cậy của dữ liệu

### Staging Area (Vùng đệm)

Khu vực lưu trữ trung gian trong quy trình ETL (optional nhưng quan trọng).

**Mục đích:**
- Giải quyết vấn đề thời gian khi không thể extract từ tất cả nguồn cùng lúc

**Chức năng:**
- **Consolidation**: "Chiếc xô" chứa dữ liệu tạm từ nhiều nguồn
- **Alignment**: Chuẩn hóa reference data, kiểm tra relationships
- **Conflict reduction**: Truyền tải hiệu quả không gián đoạn source systems
- **Other functions**: Change detection, data cleansing, independent scheduling

### Metadata Repository (Kho siêu dữ liệu)

Metadata là "dữ liệu về dữ liệu", định nghĩa các objects trong Data Warehouse.

**Nội dung:**

**1. Data Warehouse Structure:**
- Schema, dimensions, hierarchies
- Derived data definitions

**2. Operational Metadata:**
- **Data lineage**: Lịch sử di cư và transformation steps
- **Monitoring**:  Usage statistics, error logs, audit trails

**3. Mapping:**
- Cách transform từ operational environment sang warehouse
- Aggregation algorithms

**4. Business Metadata:**
- Business term definitions
- Data ownership và policies

## OLTP vs OLAP

### OLTP (Online Transaction Processing)

Hệ thống phục vụ **hoạt động vận hành hàng ngày**. 

**Đặc điểm:**
- Số lượng lớn **short online transactions** (INSERT, UPDATE, DELETE)
- Focus:  **Fast query processing** và **data integrity** trong môi trường multi-access
- **Measurement**:  Transactions per second
- **Data**:  Detailed, current data
- **Data model**: Entity model (thường 3NF - Third Normal Form)

### OLAP (Online Analytical Processing)

Hệ thống tối ưu cho **phân tích dữ liệu và ra quyết định**.

**Đặc điểm:**
- **Low transaction volume**
- **Complex queries** với nhiều aggregations
- **Measurement**: Response time
- **Data**:  Historical, aggregated data
- **Data model**:  Multidimensional schemas (Star Schema)
- **Application**:  Widely used by Data Mining techniques

### Comparison Table

| Aspect | OLTP (Operational) | OLAP (Analytical) |
|--------|-------------------|-------------------|
| **Purpose** | Quản lý giao dịch hàng ngày | Hỗ trợ phân tích, quyết định |
| **Transaction Type** | INSERT, UPDATE, DELETE (short) | Complex queries, aggregations |
| **Data Stored** | Detailed, current | Historical, aggregated |
| **Schema** | Entity model (3NF) | Multidimensional (Star schema) |
| **Measurement** | Transactions/second | Response time |
| **Users** | Operational staff, customers | Managers, analysts |

### Performance Requirements

**OLTP:**
- **Fast response time**:  Quan trọng nhất cho user experience (thanh toán, đăng ký)
- **Consistency**: Dữ liệu luôn up-to-date và nhất quán
- **Main challenge**: **Concurrency** - hàng ngàn users truy cập đồng thời

**OLAP:**
- **Resource intensive**: Queries tiêu thụ rất nhiều CPU, RAM
- **Static data**: Hoạt động trên snapshot tĩnh, không phải real-time
- **Separation reason**:  Chạy OLAP trên OLTP database → lock tables → block transactions → giảm performance

### Data Modeling Differences

| Feature | OLTP (Source Systems) | OLAP (Data Warehouse) |
|---------|----------------------|----------------------|
| **Schema** | **Normalized** (đảm bảo consistency, tránh redundancy) | **De-normalized** (giảm JOINs) |
| **Complexity** | Mô hình phức tạp, nhiều bảng nhỏ | Ưu tiên đơn giản, dễ hiểu |
| **Performance** | Tối ưu cho limited standard updates/queries | Ít bảng → cải thiện analytical query performance |
| **Design** | Application-oriented | Subject-oriented |

## Multidimensional Data Model (Mô hình đa chiều)

### Data Cube Concept

Data Warehouse dựa trên **multidimensional data model**, cho phép xem dữ liệu dưới dạng **Data Cube**.

**Definition:**
- Cấu trúc **n-dimensional** (không chỉ 3D)
- Cho phép mô hình hóa và quan sát dữ liệu từ nhiều khía cạnh (dimensions)
- Tối ưu cho fast data analysis (aggregation, filtering, comparison)

**Example:** Dữ liệu bán hàng
- Sản phẩm A được bán ở đâu?  (Location dimension)
- Sản phẩm A bán chạy khi nào? (Time dimension)
- Tại chi nhánh X, sản phẩm nào doanh thu cao nhất? (Product dimension)

### Components of Data Cube

#### 1. Fact Table (Bảng sự kiện)

**Content:**
- **Measures**:  Số liệu đo lường (revenue, quantity sold, profit...)
- **Foreign keys**: Dẫn đến các dimension tables

**Characteristics:**
- Kích thước rất lớn (millions of rows)
- Lưu trữ mọi transactions/events

#### 2. Dimension Table (Bảng chiều)

**Content:**
- Cung cấp **context** cho measures
- Thông tin mô tả để filter/group by

**Examples:**
- **Product dimension**: Product name, brand, category
- **Location dimension**: City, country, region
- **Time dimension**:  Day, week, month, quarter, year

**Characteristics:**
- Chứa descriptive attributes
- Cho phép filter và group by khi truy vấn

### Why Data Cube is Effective? 

Khác với OLTP tables (nhiều JOINs phức tạp), Data Cube đã **pre-compute** hoặc tổ chức để các thao tác sau diễn ra tức thì: 

- **Roll-up**: Chi tiết → Tổng quát (Day → Quarter)
- **Drill-down**:  Tổng quát → Chi tiết (Year → Month)
- **Slice and Dice**:  Chọn lát cắt cụ thể (chỉ xem "Phones" tại "Hanoi")

## Data Warehouse Schemas

### 1. Star Schema (Lược đồ hình sao)

Loại schema đơn giản và phổ biến nhất.

**Structure:**
- Một **Fact table** ở trung tâm
- Kết nối trực tiếp với các **Dimension tables** xung quanh

**Characteristics:**
- Dimension tables **denormalized** (không chuẩn hóa)
- Giảm số lượng JOINs
- Tối ưu cho query performance và dễ hiểu

**Example:**
```
Fact_Sales (center)
├── Dim_Product (Product_Key, Product_Name, Category, Brand)
├── Dim_Store (Store_Key, Store_Name, City, State, Country)
└── Dim_Time (Date_Key, Day, Month, Quarter, Year)
```

### 2. Snowflake Schema (Lược đồ bông tuyết)

Biến thể nâng cao của Star Schema để tối ưu storage.

**Structure:**
- Dimension tables được **normalized** thành các bảng nhỏ hơn theo hierarchies

**Characteristics:**
- Giảm data redundancy, tiết kiệm bộ nhớ
- Tăng complexity của queries (nhiều JOINs hơn)
- Hình dạng "vươn ra" như bông tuyết

**Example:**
```
Dim_Store → Dim_City → Dim_State → Dim_Country
Dim_Product → Dim_Category → Dim_Department
```

### 3. Fact Constellations / Galaxy Schema (Lược đồ chòm sao)

Dành cho hệ thống doanh nghiệp lớn với phân tích phức tạp.

**Structure:**
- **Nhiều Fact tables** cùng share một số **Dimension tables**

**Characteristics:**
- Collection of multiple "stars"
- Còn gọi là Galaxy Schema

**Example:**
```
Fact_Sales ──┐
             ├── Dim_Time
Fact_Inventory ──┤
             ├── Dim_Product
             └── Dim_Location
```

### Schema Comparison

| Feature | Star Schema | Snowflake Schema | Fact Constellation |
|---------|-------------|------------------|-------------------|
| **Complexity** | Thấp (dễ hiểu) | Trung bình | Cao |
| **Fact Tables** | 1 | 1 | Nhiều (N) |
| **Normalization** | Denormalized | Normalized | Cả hai |
| **Query Speed** | Nhanh nhất (ít JOIN) | Chậm hơn (nhiều JOIN) | Tùy thiết kế |
| **Use Case** | Fast queries, dễ hiểu | Tiết kiệm storage | Enterprise, multi-subject |

## Concept Hierarchy (Phân cấp khái niệm)

### Definition

**Concept Hierarchy** là chuỗi ánh xạ từ khái niệm **low-level (chi tiết)** lên **high-level (tổng quát)**.

### Role in OLAP

- **Organize multidimensional data**:  Mỗi dimension chứa nhiều levels of abstraction
- **Flexible aggregation**: Tóm tắt dữ liệu ở các mức granularity khác nhau
- **Support OLAP operations**: Roll-up và Drill-down dựa trên hierarchies

### Examples

#### 1. Location Hierarchy (Chiều địa lý)

```
Level 5 (Highest): Country (Quốc gia)
Level 4: City/Province (Thành phố/Tỉnh)
Level 3: District (Quận/Huyện)
Level 2: Ward (Phường/Xã)
Level 1 (Lowest): Street Address (Số nhà, Đường)
```

#### 2. Time Hierarchy (Chiều thời gian)

```
Level 5: Year
Level 4: Quarter
Level 3: Month
Level 2: Week
Level 1: Day (21/01/2026)
```

#### 3. Product Hierarchy (Chiều sản phẩm)

```
Level 4: Industry (Điện tử tiêu dùng)
Level 3: Category (Điện thoại thông minh)
Level 2: Product Line (iPhone 15 Series)
Level 1: SKU (iPhone 15 Pro Max 256GB Gold)
```

### Application in OLAP

- **Roll-up**: Doanh số theo **Tháng** → xem tổng theo **Năm** (Level 3 → Level 5)
- **Drill-down**: Doanh số **Việt Nam** → chi tiết **TP. HCM** (Level 5 → Level 4)

## OLAP Operations (Các thao tác OLAP)

### 1. Roll-up (Drill-up / Tổng hợp lên)

Tóm tắt dữ liệu để có cái nhìn tổng quát hơn.

**Mechanism:**
- Leo lên các bậc cao hơn trong Concept Hierarchy
- Hoặc giảm bớt dimensions

**Example:** Doanh số theo **City** → Roll-up → Doanh số theo **Country**

### 2. Drill-down (Roll-down / Khoan sâu)

Thao tác ngược lại Roll-up, đi sâu vào chi tiết.

**Mechanism:**
- Đi từ summarized data xuống detailed data
- Hoặc thêm dimensions mới vào phân tích

**Example:** Doanh số theo **Year** → Drill-down → Chi tiết theo **Month**

### 3. Slice and Dice (Cắt lát và Chọn khối)

Lọc và trích xuất phần cụ thể của Data Cube.

**Slice (Cắt lát):**
- Chọn **một giá trị duy nhất** cho một dimension
- Biến 3D cube → 2D plane
- **Example**:  Chỉ xem dữ liệu năm "2024"

**Dice (Chọn khối con):**
- Chọn **dải giá trị** trên nhiều dimensions
- Tạo sub-cube nhỏ hơn
- **Example**:  Xem "Phones" và "Laptops" tại "Hanoi" trong "Q1"

### 4. Pivot (Rotate / Xoay)

Thay đổi cách trình bày dữ liệu mà không làm thay đổi giá trị.

**Mechanism:**
- Định hướng lại cube
- Đổi vị trí rows và columns
- Chuyển 3D view → series of 2D planes

**Purpose:** Góc nhìn trực quan khác nhau, dễ so sánh chỉ số từ các dimensions

## Data Warehouse Architecture

### 3-tier Architecture

**Bottom Tier (Data Warehouse Server):**
- Chứa warehouse database
- ETL từ Operational DB và External Sources
- Metadata Repository

**Middle Tier (OLAP Server):**
- Cung cấp multidimensional view
- Trung gian giữa raw warehouse và reporting tools

**Top Tier (Front-end Tools):**
- Query/Report tools
- Analysis tools
- Data Mining tools

### Enterprise Warehouse vs Data Mart

**Enterprise Warehouse:**
- Thu thập **tất cả thông tin** về các chủ đề covering toàn bộ organization

**Data Mart:**
- Chứa dữ liệu cho **một bộ phận cụ thể** hoặc business line (Sales, Finance, HR)

**Relationship:**
- Warehouse có thể cung cấp dữ liệu cho Data Mart
- Data Mart có thể nuôi dữ liệu cho Warehouse tổng

## Implementation & Optimization

### Data Cube Materialization

**Full Materialization:**
- Tính toán và lưu **tất cả cuboids**
- **Pros**:  Query tức thì
- **Cons**: Tốn bộ nhớ

**No Materialization:**
- Không lưu sẵn, chỉ tính khi query
- **Pros**: Tiết kiệm bộ nhớ
- **Cons**: Chậm

**Partial Materialization (Phổ biến nhất):**
- Chỉ lưu cuboids được query thường xuyên
- **Pros**: Cân bằng giữa speed và storage

### OLAP Indexing

**Bitmap Index:**
- Sử dụng bit strings để represent data
- Hiệu quả cho **low-cardinality dimensions** (ít giá trị unique)

**Join Index:**
- Lưu sẵn kết quả JOIN giữa Fact table và Dimension tables
- Tăng tốc query performance

### OLAP Server Types

**ROLAP (Relational OLAP):**
- Sử dụng relational database để lưu multidimensional data

**MOLAP (Multidimensional OLAP):**
- Sử dụng specialized multidimensional array structures

**HOLAP (Hybrid OLAP):**
- Kết hợp ROLAP (detailed data) và MOLAP (aggregated data)

---

## Summary

**Data Warehouse Core Concepts:**
- **Multidimensional model** với Data Cube (Dimensions + Measures)
- **Four characteristics**: Subject-oriented, Integrated, Time-variant, Non-volatile
- **ETL process**: Extract → Transform → Load từ OLTP vào OLAP

**Schemas:**
- **Star**:  Đơn giản, nhanh (denormalized dimensions)
- **Snowflake**: Tiết kiệm storage (normalized dimensions)
- **Constellation**: Multi-fact tables sharing dimensions

**OLAP Operations:**
- Roll-up/Drill-down (theo hierarchies)
- Slice/Dice (filtering)
- Pivot (change view orientation)

**Architecture:**
- 3-tier: Data Warehouse Server → OLAP Server → Front-end Tools
- Enterprise Warehouse (toàn tổ chức) vs Data Mart (bộ phận cụ thể)

**Implementation:**
- Materialization strategies (full/partial/none)
- Indexing (Bitmap, Join index)
- Server types (ROLAP, MOLAP, HOLAP)