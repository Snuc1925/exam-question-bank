import json
import os
import re

def transform_exam_data(folder_path):
    # Duyệt qua các file trong thư mục
    for filename in os.listdir(folder_path):
        if filename.endswith(".json"):
            file_path = os.path.join(folder_path, filename)
            
            with open(file_path, 'r', encoding='utf-8') as f:
                try:
                    data = json.load(f)
                except json.JSONDecodeError:
                    print(f"Lỗi định dạng JSON tại file: {filename}")
                    continue

            # Xử lý từng câu hỏi trong danh sách
            for item in data:
                old_answers = item.get("answers", {})
                correct_list = item.get("correctAnswers", [])
                
                # 1. Chuyển đổi answers thành danh sách kèm T/F
                new_answers = []
                for key, value in old_answers.items():
                    suffix = " (T)" if key in correct_list else " (F)"
                    new_answers.append(f"{value}{suffix}")
                
                item["answers"] = new_answers
                
                # 2. Xóa bỏ correctAnswers cũ (vì đã tích hợp vào answers)
                if "correctAnswers" in item:
                    del item["correctAnswers"]
                
                # 3. Làm sạch explanation: bỏ (A), (B), (C), (D)...
                if "explanation" in item:
                    # Regex tìm (A) hoặc (B) hoặc (C) hoặc (D) không phân biệt hoa thường
                    clean_expl = re.sub(r'\([A-D]\)', '', item["explanation"], flags=re.IGNORECASE)
                    # Xóa khoảng trắng thừa do việc xóa ký tự để lại
                    item["explanation"] = re.sub(r'\s+', ' ', clean_expl).strip()

            # Lưu lại file
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            
            print(f"Đã xử lý xong: {filename}")

# Đường dẫn thư mục của bạn
path = r"D:\Shared Folder\HUST\Ontap\exam-question-bank\courses\data-visualization"
transform_exam_data(path)