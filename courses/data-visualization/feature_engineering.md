# Feature Engineering (Kỹ thuật đặc trưng)

## Introduction

### Definition

Feature Engineering là **"nghệ thuật"** quan trọng nhất trong Machine Learning. 

**Theo Jason Brownlee & Andrew Ng:**
> Feature Engineering không đơn thuần là data cleaning, mà là việc dùng **domain knowledge** để biến đổi raw data thành **features** giúp mô hình học dễ hơn và chính xác hơn.

### Why Important? 

**GIGO Principle**:   Garbage In, Garbage Out
- Dữ liệu "rác" + Mô hình tốt nhất = Kết quả "rác"
- Good features + Simple model > Bad features + Complex model

**Example:**
```
Raw data:   Start_Time, End_Time
Engineered feature:   Duration = End_Time - Start_Time
```
Duration feature có giá trị dự đoán cao hơn nhiều so với timestamps riêng lẻ.

## Binarization (Nhị phân hóa)

### Definition

Biến đổi dữ liệu số (counts) thành giá trị **binary (0 hoặc 1)**.

### When to Use? 

Khi **hành động có xảy ra** quan trọng hơn **số lần xảy ra**. 

### Example:  Music Recommendation

**Problem:**
- User A nghe "Lạc Trôi" 100 lần (có thể quên tắt)
- User B nghe "Lạc Trôi" 1 lần (thực sự thích)

**Raw data:**
```
Listen_Count:   0, 1, 5, 100, 1000
```

**Binarization:**
```
Has_Listened:  0 (No) or 1 (Yes)
```

**Benefit:** Giảm noise từ outliers, focus vào engagement thay vì frequency.

## Quantization / Binning (Rời rạc hóa)

### Definition

Chia continuous values thành discrete "bins" (thùng).

### A. Fixed-width Binning

Xác định intervals cố định. 

#### Equal Width Binning

**Formula:**
```
Bin_Width = (Max - Min) / Number_of_Bins
```

**Example - Age:**
```
Raw:   1, 2, 3, .. ., 90
Bins: 
  - 0-12:   Children
  - 13-17:  Teenagers  
  - 18-24:  Young Adults
  - 25-64:  Adults
  - 65+:  Seniors
```

**Pros:**
- Dễ tính toán
- Interpretable

**Cons:**
- Nếu data skewed → nhiều bins trống
- Example: 90% người 20-30 tuổi, vài người 90 tuổi → bins cao bị waste

### B.  Adaptive-width Binning

Điều chỉnh bin widths dựa trên **data distribution density**.

#### Equal Frequency Binning (Quantile-based)

**Goal:** Mỗi bin có **số lượng observations bằng nhau**.

**Method:** Sử dụng **Quantiles (Điểm phân vị)**.

**Common Quantiles:**

**Median (2-quantile):**
- Chia data làm 2 phần bằng nhau
- 50% below, 50% above

**Quartiles (4-quantile - Q1, Q2, Q3, Q4):**
- Chia data làm 4 phần
- Mỗi ph���n 25% observations
- Q1: 25th percentile
- Q2: 50th percentile (Median)
- Q3: 75th percentile

**Deciles (10-quantile - D1.. D10):**
- Chia data làm 10 phần
- Mỗi phần 10%

**Example - Income Distribution:**

**Fixed-width:**
- Bins: 0-10M, 10-20M, 20-30M... 
- Problem: 90 người < 10M → Bin 1 có 90, các bins khác gần trống

**Adaptive-width (Quartiles):**
- Q1 (25 người nghèo nhất): 0-5M
- Q2 (25 người tiếp theo): 5-8M
- Q3 (25 người):  8-15M
- Q4 (25 người giàu nhất):  15-100M

**Benefit:** Mô hình học được sự khác biệt giữa các nhóm tốt hơn, balanced bins.

### Comparison

| Method | Bin Width | Distribution | Use When |
|--------|-----------|--------------|----------|
| **Equal Width** | Cố định | Có thể unbalanced | Data uniform, known range |
| **Equal Frequency** | Variable | Balanced counts | Skewed data, focus on distribution |

## Data Transformation

### 1. Log Transformation

Áp dụng logarithm cho dữ liệu. 

**Formula:**
```
x' = log(x)  hoặc log(x + 1) nếu có zeros
```

**When to Use:**
- Data bị **positive skew** (lệch phải)
- Vài giá trị cực lớn kéo dài tail

**Effects:**
- **Compress** large values
- **Expand** small values
- Transform về gần **Normal Distribution**
- Giảm tác động **outliers**

**Example - Income Data:**
```
Raw:  10M, 15M, 20M, 1000M (outlier)
Log-transformed:  7.0, 7.2, 7.3, 9.0
```
Outlier ảnh hưởng giảm đáng kể.

### 2. Box-Cox Transformation

Generalized power transformation, tự tìm optimal λ.

**Formula:**
```
         ┌ (x^λ - 1) / λ   if λ ≠ 0
y(λ) =  │
         └ log(x)          if λ = 0
```

**Characteristics:**
- Tự động find best λ để data → Normal Distribution
- **Requirement**:  x > 0 (chỉ positive values)

**Benefit:** Mạnh và flexible hơn Log transformation.

## Feature Scaling (Thay đổi quy mô)

### Why Scaling? 

**Problem Example:**
- Feature 1:  Age (0-100)
- Feature 2:  Income (0-1,000,000,000)

Algorithms như Linear Regression, KNN, SVM sẽ coi Income quan trọng gấp **triệu lần** Age chỉ vì magnitude lớn hơn.

**Solution:** Scale về cùng range.

### A. Min-Max Scaling (Normalization)

Đưa data về range **[0, 1]**. 

**Formula:**
```
x' = (x - x_min) / (x_max - x_min)
```

**Characteristics:**
- Preserves zeros (tốt cho **sparse data**)
- **Sensitive to outliers**:   Một giá trị khổng lồ → tất cả values khác bị ép về gần 0

**Use When:**
- Biết chắc min/max bounds
- Không có outliers
- Neural Networks với bounded activation functions

### B. Standard (Z-score) Scaling (Standardization)

Transform để có **mean = 0**, **std = 1**.

**Formula:**
```
x' = (x - μ) / σ
```
- μ = mean
- σ = standard deviation

**Characteristics:**
- Nhiều algorithms assume Normal Distribution
- **Less sensitive to outliers** hơn Min-Max
- Không bound về fixed range

**Use When:**
- Linear Regression, Logistic Regression
- SVM, Neural Networks
- Data gần Normal Distribution

### C. L2 Normalization (Euclidean Norm)

Normalize theo **vector**, không phải từng feature độc lập.

**Formula:**
```
x' = x / ||x||₂
```
- ||x||₂ = sqrt(x₁² + x₂² + ... + xₙ²)

**Effect:**
- Tổng bình phương của vector = 1
- **Direction** của vector giữ nguyên, chỉ thay đổi **magnitude**

**Use When:**
- Text processing (TF-IDF)
- Cosine similarity calculations
- Direction quan trọng hơn magnitude

### Comparison Table

| Method | Range | Outlier Sensitivity | Use Case |
|--------|-------|---------------------|----------|
| **Min-Max** | [0, 1] | Very high | Known bounds, no outliers |
| **Standard** | Unbounded | Medium | Most ML algorithms |
| **L2 Norm** | ||x|| = 1 | Low | Text, similarity measures |

## Categorical Variable Encoding

ML models chỉ làm việc với numbers → cần encode categorical variables.

### 1. Label Encoding

Gán mỗi category một số unique theo thứ tự xuất hiện.

**Example:**
```
["Hà Nội", "Đà Nẵng", "TP. HCM"]  →  [0, 1, 2]
```

**Problem:**
- Model có thể hiểu lầm:   TP.HCM (2) "lớn hơn" Hà Nội (0)
- **Không phù hợp** cho nominal categories (không có thứ tự)

### 2. Ordinal Encoding

Tương tự Label Encoding nhưng **tuân thủ thứ tự logic**.

**Example - Satisfaction Level:**
```
["Low", "Medium", "High"]  →  [1, 2, 3]
```

**Characteristics:**
- Preserves **order relationship**
- Phù hợp cho ordinal categories

### 3. One-Hot Encoding

Tạo **N binary columns** cho N categories.

**Example - Device Type:**
```
Original: 
  Row 1:  Desktop
  Row 2:  Tablet
  Row 3:  Mobile

One-Hot:
       Desktop  Tablet  Mobile
Row 1:    1       0       0
Row 2:    0       1       0
Row 3:    0       0       1
```

**Pros:**
- Không có ordinal assumption
- Phù hợp cho hầu hết algorithms

**Cons:**
- **Curse of dimensionality**:  1000 categories → 1000 columns
- Sparse data (nhiều zeros)

### 4. Frequency / LabelCount Encoding

Thay thế category bằng **count** hoặc **frequency rank**.

**Example - City Orders:**
```
100 orders: 
  - 80 from Hà Nội
  - 15 from TP.HCM
  - 5 from Đà Nẵng

Encoding:
  Hà Nội   →  80 (or rank 1)
  TP.HCM   →  15 (or rank 2)
  Đà Nẵng  →  5  (or rank 3)
```

**Benefit:**
- Model biết category nào phổ biến, nào hiếm
- Single column, không tăng dimensionality

### 5. Target Mean Encoding

Thay thế category bằng **mean của target variable** cho category đó.

**Formula:**
```
Encoding(category) = mean(target | category)
```

**Example - Purchase Prediction:**
```
Target: Purchase (1) or Not (0)

Hà Nội:   10 appearances, 8 purchases
  → Encoding = 8/10 = 0.8

TP.HCM:  20 appearances, 10 purchases
  → Encoding = 10/20 = 0.5
```

**Pros:**
- Rất mạnh, phổ biến trong Kaggle competitions
- Captures relationship với target

**Cons:**
- **Data Leakage risk**:  Dễ "học thuộc" training data
- **Solution**: Dùng cross-validation khi tính encoding

### 6. Feature Hashing (Hash Trick)

Sử dụng **hash function** để map categories vào fixed-size vector.

**Example:**
```
1,000,000 User_IDs  →  Hash to 100 bins
```

**Pros:**
- Handle **very high cardinality** (millions of categories)
- Fixed dimensionality
- Memory efficient

**Cons:**
- **Hash collisions**: Hai categories khác nhau có thể hash vào cùng bin
- Loss of interpretability

**Use When:**
- Millions of categories (User_IDs, Product_IDs)
- Memory constraints

### 7. Bin-counting

Dùng **statistical measures** liên quan giữa category và target.

**Example - Click-Through Rate (CTR) Advertising:**
```
Ad_ID  →  Clicks / Impressions

Ad_123:   100 clicks / 1000 impressions = 0.1 (10% CTR)
```

**Benefit:**
- Trực tiếp cung cấp "relationship" giữa feature và target
- Hiệu quả cho linear models và tree-based models

### Encoding Selection Guide

| Scenario | Recommended Encoding |
|----------|---------------------|
| **Ordinal data** (S, M, L) | Ordinal Encoding |
| **Few categories** (< 10) | One-Hot Encoding |
| **Many categories** (Cities, Brands) | Target Mean hoặc Frequency |
| **Very high cardinality** (User_IDs) | Feature Hashing |
| **Tree-based models** | Target Mean, Bin-counting |
| **Linear models** | One-Hot, Standard Scaling after encoding |

## Text Vectorization (NLP)

### Overview

Process biến text thành vectors mà machines có thể process.

### 1. Bag-of-Words (BoW)

Coi văn bản như "túi từ", không quan tâm **order** hay **grammar**.

**Example:**
```
Doc 1:  "John is quicker than Mary"
Doc 2:  "Mary is quicker than John"

BoW vectors (giống nhau! ):
  John: 1, is:  1, quicker: 1, than: 1, Mary:  1
```

**Characteristics:**
- Output:  **Flat vector** của word frequencies
- **Loses structure** hoàn toàn

**Pros:**
- Simple, fast
- Good baseline

**Cons:**
- Mất thông tin word order
- "not good" vs "good" có thể giống nhau

**Use Case:** Simple classification (spam detection)

### 2. Bag-of-n-Grams

Mở rộng BoW để **preserve một phần context**.

**n-Gram Types:**

**Unigram (n=1):**
```
"Customer reviews build"  →  ["Customer", "reviews", "build"]
```

**Bigram (n=2):**
```
"Customer reviews build something"  
  →  ["Customer reviews", "reviews build", "build something"]
```

**Trigram (n=3):**
```
"Customer reviews build something"
  →  ["Customer reviews build", "reviews build something"]
```

**Pros:**
- Captures **local context**
- "not good" ≠ "good" (bigram captures negation)

**Cons:**
- **Dimensionality explosion**:  Vocabulary size^n
- Extremely **sparse** vectors

### 3. Text Processing Steps

**Tokenization:**
- Chia text thành **tokens** (words, punctuation)
```
"Tôi đi học"  →  ["Tôi", "đi", "học"]
```

**Chunking (Phrase detection):**
- Nhóm tokens thành **meaningful phrases**
```
"Con mèo đen đang ngủ"
  →  [Noun Phrase:  "Con mèo đen"], [Verb Phrase: "đang ngủ"]
```

### 4. TF-IDF (Term Frequency - Inverse Document Frequency)

Gán **weights** cho words dựa trên importance.

#### Core Philosophy

**Rare words carry more information than common words.**

- **Common words** ("and", "the", "is"):  Xuất hiện everywhere → low value
- **Rare words** ("Arachnocentric"):  Xuất hiện rarely → high signal

#### TF (Term Frequency)

Đo **frequency** của term t trong document d.

**Formula:**
```
TF(t, d) = 1 + log(count(t, d))
```

**Why log?** Giảm impact của excessive repetition.

#### IDF (Inverse Document Frequency)

Đo **rarity** của term t trong corpus (N documents).

**Formula:**
```
IDF(t) = log(N / df(t))
```
- N = Total documents
- df(t) = Number of documents containing t

**Why log?** Dampen extreme values.

#### TF-IDF Combined

**Formula:**
```
TF-IDF(t, d) = TF(t, d) × IDF(t)

= [1 + log(count(t,d))] × log(N / df(t))
```

**Properties:**
1. **Increases** khi term frequent trong document (high TF)
2. **Increases** khi term rare trong corpus (high IDF)
3. **Equals 0** khi term trong mọi documents (df = N → log(1) = 0)

#### Example

**Corpus:** 10,000 articles (N = 10,000)

**Word "Cơm":**
- Appears in 5,000 articles
- IDF = log(10000/5000) = log(2) ≈ 0.3

**Word "Blockchain":**
- Appears in 10 articles
- IDF = log(10000/10) = log(1000) ≈ 3.0

**Result:** "Blockchain" weight **10x higher** than "Cơm". 

### 5. Filtering for Cleaner Features

**Stopwords Removal:**
- Remove extremely common words:  "and", "the", "là", "của"

**Frequency-Based Filtering:**
- **Too frequent**:  Remove corpus-specific common words
- **Too rare**: Remove typos, ultra-rare terms (< 5 occurrences)
  - Benefit: Reduce sparse matrix, improve generalization

**Stemming:**
- Reduce words về **root form**
```
"fishing", "fished", "fisher"  →  "fish"
```
- **Purpose**: Reduce vocabulary complexity, group related words

### 6. Word Embedding

Revolutionary approach:   Encode **semantics**, not just counts.

#### Core Philosophy

> **"You shall know a word by the company it keeps."** (J. R.  Firth, 1957)

Words appearing in **similar contexts** have **similar meanings**.

**Example:**
```
Context for "Trump":  "Presidency", "Campaign", "Election"
Context for "Biden":  "Presidency", "Campaign", "Election"

→  "Trump" and "Biden" vectors should be close
```

#### Characteristics

**Dense Vectors:**
- Not sparse (full of zeros)
- Short vectors:  50, 100, 300 dimensions

**Semantic Relationships:**
- Similar words → similar vectors
```
vector("University") ≈ vector("School")
vector("University") ≠ vector("Apple")
```

#### Word2vec (Mikolov et al., 2013)

Most famous embedding algorithm.

**Training:**
- **Unsupervised learning** trên massive text corpus
- Reads billions of words (Wikipedia, news)
- No manual labeling needed

**Advantages:**
- Handles huge datasets
- Low computational cost
- **Captures logical relationships**

**Famous Example:**
```
vector("King") - vector("Man") + vector("Woman") 
  ≈ vector("Queen")
```

### Comparison:   BoW/TF-IDF vs Word Embedding

| Feature | BoW / TF-IDF | Word Embedding |
|---------|-------------|----------------|
| **Vector type** | Sparse (many zeros) | Dense (all non-zero) |
| **Dimensionality** | Vocabulary size (10K-100K+) | Fixed small (50-300) |
| **Semantics** | No semantic understanding | Captures meaning |
| **Example** | "Smart" and "Intelligent" = separate columns | "Smart" ≈ "Intelligent" (close vectors) |
| **Use** | Traditional ML | Deep Learning, modern NLP |

## Feature Selection & Creation

### 1. Creating New Features

#### Interaction Features

**Definition:** Tích của hai features khác nhau.

**Why?** Kết hợp features có thể có tác động lớn hơn tổng riêng lẻ.

**Example - House Price:**
```
Feature 1:  Area (x₁)
Feature 2:  Location_Score (x₂)

Interaction:  Area × Location = x₁ × x₂

Insight:  Large house in premium location có giá trị 
exponentially higher, không phải chỉ additive
```

**Linear Model Extension:**
```
Before:  y = β₀ + β₁x₁ + β₂x₂
After:   y = β₀ + β₁x₁ + β₂x₂ + β₃(x₁×x₂)
```

#### Polynomial Features

**Definition:** Nâng features lên powers (x², x³...  ).

**Purpose:** Model **non-linear relationships** với linear algorithm.

**Example:**
```
x = 2

Polynomial degree 2:
  Features:  x, x²  →  2, 4

Polynomial degree 3:
  Features:   x, x², x³  →  2, 4, 8
```

**Use Case:** Linear Regression for curved relationships.

### 2. Feature Selection

#### Goals

**Speed:** Train faster
**Interpretability:** Simpler models easier to explain
**Accuracy:** Better generalization
**Avoid Overfitting:** Giảm "học vẹt"

#### Benefits

- Remove irrelevant features
- Remove redundant features
- Reduce computational cost
- Improve model performance

### 3. Feature Selection Methods

#### A. Filter Methods

**Mechanism:**
- Independent của ML algorithm
- Dựa trên **statistical properties**

**Speed:** Very fast

**Overfitting Risk:** Low

**Examples:**
- **Correlation coefficient**: Pearson, Spearman
- **Chi-Square test**: For categorical target
- **ANOVA F-test**: For continuous target
- **Information Gain**:  Mutual information
- **Variance threshold**: Remove low-variance features

**Use When:**
- Large datasets
- Need quick baseline
- Exploratory analysis

#### B. Wrapper Methods

**Mechanism:**
- Evaluate dựa trên **specific ML algorithm**
- Try nhiều feature combinations
- Select combination với best performance

**Speed:** Very slow (exponential complexity)

**Overfitting Risk:** High

**Examples:**

**Exhaustive Search:**
- Try tất cả possible combinations
- Computational cost: 2^n

**Forward Selection:**
1. Start with no features
2. Add one feature at a time
3. Keep feature if improves performance

**Backward Elimination:**
1. Start with all features
2. Remove one feature at a time
3. Keep removal if doesn't hurt performance

**Recursive Feature Elimination (RFE):**
- Train model
- Remove least important feature
- Repeat until desired number

**Use When:**
- Small feature sets
- Need optimal performance cho specific algorithm
- Computational resources available

#### C. Embedded Methods

**Mechanism:**
- Feature selection **during model training**
- Integrated vào algorithm

**Speed:** Medium (between Filter and Wrapper)

**Overfitting Risk:** Medium

**Examples:**

**Lasso Regression (L1 Regularization):**
```
Loss = MSE + λ × Σ|βᵢ|
```
- Penalty term forces some βᵢ → 0
- Features with β = 0 are eliminated

**Ridge Regression (L2 Regularization):**
```
Loss = MSE + λ × Σ(βᵢ²)
```
- Shrinks coefficients, doesn't eliminate

**Decision Trees:**
- Automatically select features at each split
- Features never used → not important
- **Feature importance scores** từ tree structure

**Random Forest Feature Importance:**
- Aggregate importance across trees
- Robust measure

**Gradient Boosting Feature Importance:**
- Based on gain from splits

**Use When:**
- Want balance giữa speed và accuracy
- Tree-based models (very common)
- Regularized linear models

### Comparison Table

| Method | Speed | Overfitting | Algorithm Dependency | Examples |
|--------|-------|-------------|---------------------|----------|
| **Filter** | Fast | Low | Independent | Correlation, Chi-Square |
| **Wrapper** | Very Slow | High | Dependent | Forward/Backward, RFE |
| **Embedded** | Medium | Medium | Partial | Lasso, Trees, RF |

### Selection Strategy

**Large datasets (millions of rows):**
- Start:  Filter methods
- Refine: Embedded methods

**Small datasets:**
- Can afford: Wrapper methods
- Quick: Embedded methods

**Tree-based models:**
- Best:  Embedded (built-in feature importance)

**Linear models:**
- Filter + Lasso regularization

**Deep Learning:**
- Usually skip feature selection
- Neural networks learn representations automatically

---

## Summary

### Feature Engineering Pipeline

```
Raw Data
    ↓
Binarization / Binning (discretization)
    ↓
Transformation (Log, Box-Cox)
    ↓
Scaling (Min-Max, Standard, L2)
    ↓
Categorical Encoding (One-Hot, Target Mean, Hashing)
    ↓
Text Vectorization (BoW, TF-IDF, Word2vec)
    ↓
Feature Creation (Interactions, Polynomials)
    ↓
Feature Selection (Filter, Wrapper, Embedded)
    ↓
Model Training
```

### Key Principles

**Domain Knowledge Critical:**
- Best features từ understanding business problem

**Experimentation:**
- Try multiple encoding strategies
- Compare performance

**Avoid Leakage:**
- Target encoding cẩn thận với cross-validation
- Không dùng future information

**Balance:**
- Too many features → overfitting, slow
- Too few features → underfitting, poor performance

**Iteration:**
- Feature engineering là iterative process
- Continuously refine based on model feedback