# Data Lake & Data Lakehouse

## New Big Data Thinking (Tư duy Big Data mới)

### Core Philosophy:  All Data Has Value

Tư duy hiện đại thay đổi từ "lưu những gì cần thiết" sang "lưu tất cả mọi thứ". 

**Key Concepts:**
- **Potential value**:  Mọi dữ liệu đều có giá trị tiềm năng → xu hướng "Data hoarding" (tích trữ dữ liệu)
- **Native format**: Lưu trữ ở định dạng gốc, không cần định nghĩa schema trước
- **Schema-on-read**: Cấu trúc dữ liệu chỉ được áp dụng khi truy vấn, không phải khi nạp

**Contrast với Traditional approach:**
- Traditional: Schema-on-write (định nghĩa cấu trúc trước khi lưu)
- Modern: Schema-on-read (linh hoạt, người dùng tự giải thích dữ liệu)

## Data Lake (Hồ dữ liệu)

### Definition

Data Lake là kho lưu trữ tập trung cho phép lưu toàn bộ dữ liệu **structured và unstructured** ở **bất kỳ quy mô nào**. 

**Characteristics:**
- **Fidelity (Độ nguyên bản)**: Dữ liệu được lưu dưới dạng bản sao gần như/hoàn toàn chính xác với định dạng nguồn
- **Purpose**:  Cung cấp "unrefined view" của dữ liệu
- **Flexibility**: Nhà phân tích có tay nghề cao tự do khám phá kỹ thuật phân tích và tinh chế
- **No rigid rules**: Không bị ràng buộc bởi quy tắc cứng nhắc của DW truyền thống

### Top-down vs Bottom-up Approaches

#### Data Warehouse:  Top-down Approach

Cách tiếp cận có kế hoạch và mục tiêu rõ ràng ngay từ đầu. 

**Process:**
1. **Understand strategy & Gather requirements**:  Bắt đầu từ business needs
2. **Implement**:
   - Design reports
   - Dimensional modeling
   - Design ETL
   - Setup infrastructure
3. **Result**: Dữ liệu structured chặt chẽ cho Dashboards và BI reports cụ thể

#### Data Lake:  Bottom-up Approach

Cách tiếp cận linh hoạt:  thu thập trước, phân tích sau.

**Process:**
1. **Ingest all data**: Thu thập mọi dữ liệu bất kể yêu cầu hiện tại
2. **Store all data**: Lưu ở định dạng gốc, không cần schema
3. **Do analysis**: 
   - Interactive queries
   - Real-time analytics
   - Machine Learning
   - Feed back to Data Warehouse

### Comparison Table:  Data Warehouse vs Data Lake

| Feature | Data Warehouse | Data Lake |
|---------|---------------|-----------|
| **Data** | Cleaned, aggregated, structured | Raw, native, mọi định dạng |
| **Schema** | Schema-on-write (định nghĩa trước) | Schema-on-read (định nghĩa khi dùng) |
| **Users** | Business managers, analysts | Data scientists, advanced analysts |
| **Flexibility** | Thấp (khó thay đổi cấu trúc) | Rất cao (thích ứng mọi analysis) |
| **Storage Cost** | Cao (cần preprocessing) | Thấp (raw storage ở quy mô lớn) |
| **Query Performance** | Rất nhanh (optimized) | Chậm hơn (không optimized) |
| **Use Cases** | BI, Reporting, Dashboards | Data Science, ML, Exploratory |

## Azure Big Data Ecosystem

### 1. Azure HDInsight

Hadoop và Spark managed trên cloud. 

**Features:**
- **Fully managed**: Cụm Hadoop/Spark được quản lý hoàn toàn
- **100% Open source**: Dựa trên Hortonworks Data Platform
- **Fast deployment**: Khởi chạy trong vài phút
- **High reliability**: SLA tốt nhất ngành, Microsoft support
- **Cost optimization**: TCO thấp hơn 63% so với on-premises Hadoop

**Components:**
- Hadoop (MapReduce, YARN)
- Spark (fast in-memory processing)
- Hive, HBase, Storm, Kafka... 

### 2. Azure Data Lake Store (ADLS)

HDFS trên cloud - kho lưu trữ quy mô siêu lớn.

**Features:**
- **HDFS for cloud**: Hadoop File System cho cloud environment
- **Unlimited scale**: Không giới hạn storage size
- **Native format**: Lưu bất kỳ loại dữ liệu nào ở định dạng gốc
- **Enterprise security**: 
  - Access control cấp enterprise
  - Encryption at rest
  - Integration với Active Directory

**Use Cases:**
- Big Data analytics workloads
- Centralized repository cho mọi raw data
- Foundation cho Data Lake architecture

### 3. Azure Data Lake Analytics (ADLA)

Dịch vụ phân tích phân tán trên cloud.

**Features:**
- **Built on Apache YARN**: Distributed analytics service
- **Dynamic scaling**: Mở rộng theo từng query (per-query scaling)
- **U-SQL language**: 
  - Kết hợp SQL (declarative) với C# (expressive power)
  - Familiar syntax cho SQL developers
  - Extensibility với C# code
- **Visual Studio integration**: Develop, debug, optimize nhanh hơn
- **Federated queries**: Truy vấn cross nhiều Azure data sources

**Architecture:**
- On-demand compute
- Pay-per-job model
- Separation of storage và compute

### Big Data Processing Flow

```
Data Sources (Devices, Apps, Traditional)
    ↓
Information Management (Data Factory, Data Catalog)
    ↓
Big Data Stores
    ├── Data Lake Store (raw, unstructured)
    └── SQL Data Warehouse (structured)
    ↓
Machine Learning & Analytics
    ├── HDInsight
    ├── Stream Analytics
    └── Machine Learning
    ↓
Intelligence (Cognitive Services, Bot Framework, Power BI)
    ↓
Action (People, Apps, Devices)
```

### Deployment Models (User Adoption)

**Evolution của ease of use:**

**IaaS Hadoop** (Lowest ease of use):
- Tự quản lý infrastructure
- Full control nhưng high effort

**Managed Hadoop (HDInsight)** (Medium):
- Microsoft quản lý cluster
- Workload optimized
- Focus on work, not infrastructure

**Big Data as-a-Service (ADLA)** (Highest ease of use):
- Chỉ cần viết queries
- Không quan tâm hardware configuration
- Serverless model

## Data Lakehouse

### Definition

**Data Lakehouse** là kiến trúc quản lý dữ liệu hiện đại (phổ biến từ ~2020), kết hợp ưu điểm của **Data Warehouse** và **Data Lake** trên cùng một nền tảng.

### Core Capabilities

**5 tính năng cốt lõi:**

**1. Audit History (Lịch sử kiểm toán):**
- Theo dõi mọi thay đổi dữ liệu theo thời gian
- Biết ai làm gì, khi nào
- Compliance và governance

**2. Data Versioning (Quản lý phiên bản):**
- Quay lại các phiên bản cũ của dữ liệu (như Git)
- Khôi phục sau sai sót
- So sánh kết quả phân tích giữa các thời điểm
- Time travel queries

**3. Distributed Computing and Storage:**
- Mở rộng trên nhiều máy chủ
- Xử lý khối lượng khổng lồ với tốc độ cao
- Horizontal scalability

**4. ACID Transactions:**
- **Atomicity**: All or nothing
- **Consistency**:  Dữ liệu nhất quán
- **Isolation**: Transactions không ảnh hưởng lẫn nhau
- **Durability**: Changes are permanent
- Đảm bảo data integrity ngay cả khi concurrent reads/writes
- Tránh dữ liệu rác hoặc sai lệch

**5. Dynamic Schema Evolution:**
- Thay đổi cấu trúc (thêm/bớt columns) linh hoạt
- Không làm hỏng quy trình hiện có
- Backward/forward compatibility

### Evolution Timeline

**Late 1980s - Data Warehouse:**
- **Focus**: Structured data từ operational sources
- **Use**:  BI và reporting
- **Limitations**: 
  - Khó xử lý unstructured data (video, images)
  - Chi phí cao
  - Rigid schema

**2011 - Data Lake:**
- **Focus**:  Mọi loại dữ liệu (raw, unstructured)
- **Use**: Data Science, Machine Learning
- **Advantages**:  Chi phí rẻ, flexible
- **Limitations**: 
  - Thiếu quản lý chặt chẽ
  - Dễ trở thành "Data Swamp"
  - Không có ACID guarantees

**2020 - Data Lakehouse:**
- **Focus**: Tất cả dữ liệu (Structured, Semi-structured, Unstructured) trong một nơi
- **Use**: Đồng thời cả BI/Reporting VÀ ML/Data Science
- **Advantages**: 
  - Best of both worlds
  - Single source of truth
  - Giảm data duplication
  - Vừa flexible vừa reliable

### Benefits Summary

- **Unified platform**: Không cần duy trì 2 hệ thống riêng (DW + Lake)
- **Cost reduction**: Giảm data replication redundancy
- **Data quality**: Reliability của DW + Flexibility của Lake
- **Simplified architecture**: Single governance model
- **Better performance**: Modern query engines optimized cho cả structured và unstructured

## Data Lake Architecture

### Key Components

Để Data Lake hoạt động hiệu quả, cần kết hợp nhiều components:

**1. Security:**
- Chỉ người có quyền mới truy cập
- Role-based access control (RBAC)
- Encryption at rest và in transit

**2. Orchestration & ELT:**
- Quản lý data flow từ sources vào lake
- Scheduling và monitoring
- Error handling

**3. Governance:**
- Quy tắc đảm bảo data accuracy
- Compliance policies
- Data lineage tracking

**4. Data Storage:**
- Nơi chứa actual data ở quy mô lớn
- Scalable, durable storage
- Cost-optimized tiers

**5. Metadata & Master Data:**
- Thông tin mô tả về data
- Data discovery và search
- Business glossary

**6. Analytics, BI & AI Tools:**
- Biến raw data thành insights
- Reporting, dashboards
- ML model training

### Common Data Lake Areas (Zones)

Data được chia theo mức độ xử lý:

**Staging (Vùng đệm):**
- **Purpose**: Nạp và di chuyển dữ liệu tạm thời
- **Duration**: Short-term
- **Access**: Limited

**Raw (Vùng thô):**
- **Purpose**: Lưu bản sao gốc ở định dạng nguyên bản
- **Duration**:  Permanent (forever)
- **Access**: Restricted
- **Characteristics**:  Immutable, append-only

**Curated (Vùng tinh chế):**
- **Purpose**: Dữ liệu đã transformed (e.g., star schema)
- **State**: Sẵn sàng cho analysis
- **Access**: Wider consumer access
- **Quality**: High quality, validated

**Sandbox (Vùng thử nghiệm):**
- **Purpose**: Không gian tự do cho data scientists
- **Activities**:  Exploration, experimentation
- **Controls**: Relaxed governance
- **Output**: Prototypes, POCs

### Repository Layering

| Layer | File Type | Access | Purpose |
|-------|-----------|--------|---------|
| **Raw** | Native format | Restricted | Lưu raw data:  Subject > Source > Object > Load Time |
| **Standardized** | Optimized for loading | Restricted | Data đã format lại để dễ xử lý |
| **Cleansed** | Unified | Consumers | Loại bỏ errors, chuẩn hóa |
| **Application** | Unified | App users | Cấu trúc cho specific applications |
| **Sandbox** | No limits | Data experts | Analysts làm việc tự do với data từ mọi layers |

### Folder Structure & File Formats

#### 1. Raw Files Layer (Landing Zone)

**Purpose**: Nơi dữ liệu "đổ bộ" đầu tiên

**Structure**:  
```
/year/month/day/hour/minute
```

**Format**: 
- **As-is** (nguyên trạng)
- **Compression**: Gzip
- **Rationale**: Tiết kiệm space, fast ingestion

**Volume**: Rất lớn (Terabytes/day)

**Characteristics**:
- Receive data mỗi phút
- No transformation
- Immutable

#### 2. Raw Data Layer

**Purpose**: Chuyển sang định dạng queryable, làm sạch sơ bộ

**Structure**:
```
/year/month/day
```

**Format**:
- **Type**:  Sequence Files
- **Compression**: Snappy
- **Rationale**:  
  - Snappy: Tốc độ nén/giải nén cực nhanh
  - Phù hợp parallel processing
  - Trade-off: Compression ratio thấp hơn Gzip nhưng fast

**Processing**:
- Loại bỏ ký tự đặc biệt
- Handle duplicates
- Merge small files → large files (optimize Big Data processing)

**Volume**: Trung bình (Gigabytes/day)

#### 3. Business Data Layer

**Purpose**: Dữ liệu sẵn sàng cho analytics và reporting

**Structure**:
```
/year/month
```

**Format**:
- **Type**: Parquet Files (columnar)
- **Compression**:  Snappy
- **Rationale**:
  - Parquet: Columnar format, đọc chỉ cần columns
  - Tối ưu cho Presto, Impala, Synapse
  - Fast query performance

**Processing**:
- Apply business rules
- Aggregations
- Ready để nạp vào Data Warehouse

**Volume**: Thấp (Megabytes/day)

**Strategy Summary:**
- **Càng về sau, data càng ít** nhưng value càng cao
- **Compression**: Gzip (size priority) → Snappy (speed priority)
- **Storage**: Text/Native → Sequence → Parquet (Big Data optimized)

## Data Lake Implementation (Gartner 5-Step Process)

### Step 1: Prework (Chuẩn bị)

Đặt nền móng - focus người và chiến lược. 

**Activities:**
- **Identify Lake Architect**: Chỉ định kiến trúc sư trưởng
- **Assemble Team**: 
  - Data engineers
  - Data scientists
  - Security specialists
  - Business analysts
- **Determine Requirements/Purpose Strategy**:  
  - Xác định business objectives
  - Mục đích:  AI, real-time analytics, archival? 
- **Track Risk and Security Issues**: 
  - Privacy compliance (GDPR, CCPA)
  - Security vulnerabilities
  - Data governance requirements

### Step 2: Macro-Level Architecture

Xác định luồng data tổng thể và components chính.

**Components:**
- **Inbound/Outbound**:  
  - Data sources (where from?)
  - Data consumers (where to?)
- **Data Lab**: 
  - Sandbox environment cho data scientists
  - Experimentation space
- **Determine Macro Architecture**:
  - Platform choice:  Cloud (AWS/Azure/GCP) hay On-premise (Hadoop)
  - High-level data flow
  - Integration points

### Step 3: Medium-Level Architecture/Zones

Bước quan trọng nhất - tránh "Data Swamp". 

**Activities:**
- **Categorize Data**:  
  - Phân loại theo frequency (streaming, batch)
  - Phân loại theo purpose (analytics, archival, operational)
  - Sensitivity classification (public, confidential, PII)
- **Define Zones**:
  - **Raw Zone**: Dữ liệu thô, immutable
  - **Cleansed Zone**: Validated, standardized
  - **Curated Zone**: Business-ready, aggregated
  - **Sandbox Zone**:  Experimental
- **Security & Non-functional Requirements**:
  - Performance targets (latency, throughput)
  - Availability SLAs
  - Scalability requirements
  - Disaster recovery

### Step 4: Determine Key Micro-Level Architecture

Chi tiết kỹ thuật cụ thể để vận hành. 

**Components:**
- **Security & Metadata**:
  - Encryption (at rest, in transit)
  - Access controls (RBAC, ABAC)
  - Metadata catalog (Apache Atlas, AWS Glue)
  - Data lineage tracking
- **Tools & Platforms**:
  - Development tools
  - Testing frameworks
  - CI/CD pipelines (DevOps/DataOps)
  - Monitoring và alerting
- **Performance**:
  - Query optimization
  - Caching strategies
  - Partitioning schemes
  - Indexing approaches

### Step 5: Follow-Up (Theo dõi và Cải tiến)

Kiến trúc dữ liệu là chu kỳ liên tục.

**Activities:**
- **Continuous Improvement**:
  - Cập nhật theo business needs mới
  - Technology evolution
  - Performance tuning
- **Service Quality**:
  - User satisfaction metrics
  - Data quality monitoring
  - SLA compliance
- **Monitoring & Maintenance**:
  - System health dashboards
  - Capacity planning
  - Backup và recovery testing
  - Security audits

## Data Lake:  Benefits & Risks

### Benefits

**1.  Productionizing Advanced Analytics:**
- Chuyển AI/ML models từ POC sang production nhanh
- Scalable infrastructure cho model training
- Real-time model serving

**2. Exploit Value từ Mọi Loại Dữ Liệu:**
- Structured (databases)
- Semi-structured (JSON, XML, logs)
- Unstructured (images, videos, text)
- IoT sensor data, social media feeds

**3. Reduce TCO (Total Cost of Ownership):**
- Open-source software (Hadoop, Spark)
- Commodity hardware / Cloud storage tiers
- Chi phí/TB thấp hơn nhiều so với traditional databases
- Pay-as-you-go model (cloud)

**4. Scalability & Flexibility:**
- Near-unlimited storage expansion
- Không cần redesign toàn bộ hệ thống
- Schema-on-read flexibility
- Support diverse workloads

### Risks

#### Strategic & Trust Risks: 

**1. Loss of Trust:**
- Dữ liệu không kiểm soát chất lượng → sai lệch
- Users không tin tưởng hệ thống
- "Garbage in, garbage out"
- **Mitigation**: Data quality checks, validation rules

**2. Loss of Alignment và Motivation:**
- Dự án kéo dài không tạo business value
- Mất support từ stakeholders
- **Mitigation**: Quick wins, incremental value delivery

**3. Increased Security Risk:**
- Centralized storage = attractive target
- Không có proper access controls
- Data breaches consequences
- **Mitigation**: Defense in depth, encryption, monitoring

#### Technical Risks (Especially Hadoop):

**1. Pure Hadoop Implementation:**
- Complex to operate và maintain
- Skill shortage
- **Modern alternative**: Managed cloud services

**2. Poor Query Performance:**
- Không nhanh bằng traditional RDBMS
- Dữ liệu không indexed optimally
- **Mitigation**:  Proper partitioning, file formats (Parquet)

**3. Limited Complex Query Support:**
- Thiếu query optimizer
- Không có advanced memory management
- Weak workload management
- Poor multi-user concurrency
- **Mitigation**: Modern query engines (Presto, Spark SQL)

### Avoiding "Data Swamp"

**Data Swamp** = Data đi vào nhưng không lấy ra được value

**Prevention strategies:**
- **Strong Governance** ngay từ đầu
- **Metadata management** bắt buộc
- **Data quality** checks automated
- **Clear zone definitions** và policies
- **Regular cleanup** của unused data
- **User training** và documentation

## Modern File Formats for Big Data

### Comparison Table

| Format | Type | Compression | Splittable | Use Case |
|--------|------|-------------|------------|----------|
| **Text/CSV** | Row | ❌ | ✓ (uncompressed) | Landing, exchange |
| **Gzip** | Compression | ✓✓✓ | ❌ | Archival, landing zone |
| **Snappy** | Compression | ✓ | ✓ | Fast processing |
| **Sequence** | Row | ✓ | ✓ | Intermediate processing |
| **Parquet** | Columnar | ✓✓ | ✓ | Analytics, queries |
| **ORC** | Columnar | ✓✓ | ✓ | Hive, analytics |

### Compression Strategies

**Gzip:**
- **Best compression ratio**
- Slow decompression
- Not splittable
- **Use**: Landing zone, long-term storage

**Snappy:**
- **Fast compression/decompression**
- Lower compression ratio
- Splittable
- **Use**: Processing layers, frequent access

---

## Summary

### Data Lake Core Principles:

**Philosophy:**
- Store everything (data hoarding)
- Schema-on-read flexibility
- Native formats preservation

**Architecture:**
- **Zones**: Raw → Standardized → Cleansed → Application → Sandbox
- **Layers**: Progressive refinement
- **Formats**: Text → Sequence → Parquet/ORC

**Key Technologies:**
- **Storage**:  HDFS, Cloud object storage (S3, ADLS)
- **Compute**: Hadoop, Spark, Cloud services
- **Governance**: Metadata catalogs, security controls

### Data Lakehouse Advantages:

**Unified platform:**
- DW reliability + Lake flexibility
- Single source of truth
- ACID transactions on Lake storage

**Core capabilities:**
- Audit history
- Data versioning (time travel)
- Distributed compute/storage
- ACID guarantees
- Schema evolution

### Implementation Best Practices:

**5-Step Process:**
1. Prework (people, strategy)
2. Macro architecture (overall flow)
3. Zones (most critical - avoid swamp)
4. Micro details (security, tools)
5. Follow-up (continuous improvement)

**Risk Mitigation:**
- Strong governance from day 1
- Metadata management mandatory
- Regular data quality audits
- Clear security policies
- Quick wins for stakeholder buy-in

### Evolution Path:

```
Data Warehouse (1980s)
    ↓ (Too rigid, expensive)
Data Lake (2011)
    ↓ (Too chaotic, "swamp" risk)
Data Lakehouse (2020)
    ↓ (Best of both worlds)
```

**Modern trend**:  Cloud-native lakehouses (Databricks, Snowflake) với managed services giảm operational complexity. 