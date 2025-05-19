# uvicorn server:app --host 0.0.0.0 --port 8000 --reload 
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from llama_cpp import Llama
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = FastAPI(title="Bookstore Chatbot API")
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Đường dẫn đến file mô hình GGUF
MODEL_PATH = "C:/Users/TruongDuc/Downloads/Chatbot/Model/vinallama-7b-chat_q5_0.gguf"

# Khởi tạo mô hình
try:
    llm = Llama(model_path=MODEL_PATH, n_ctx=2048)
except Exception as e:
    raise RuntimeError(f"Không thể tải mô hình từ {MODEL_PATH}: {e}")

# 20 câu hỏi thường gặp và câu trả lời tương ứng
faq_data = [
    {
        "question": "Giờ mở cửa của hiệu sách là mấy giờ?",
        "answer": "Hiệu sách của chúng tôi mở cửa từ 8:00 sáng đến 21:00 tối các ngày trong tuần, kể cả cuối tuần và ngày lễ."
    },
    {
        "question": "Làm thế nào để đặt sách online?",
        "answer": "Để đặt sách online, bạn có thể truy cập website của chúng tôi, tìm kiếm sách bạn muốn, thêm vào giỏ hàng và tiến hành thanh toán. Bạn cũng có thể đặt sách qua ứng dụng di động hoặc gọi điện trực tiếp đến số hotline 1900xxxx."
    },
    {
        "question": "Chính sách đổi trả sách như thế nào?",
        "answer": "Chúng tôi cho phép đổi trả sách trong vòng 7 ngày kể từ ngày mua với điều kiện sách còn nguyên vẹn, không bị hư hỏng hoặc có dấu hiệu đã qua sử dụng. Bạn cần giữ hoá đơn mua hàng để làm căn cứ đổi trả."
    },
    {
        "question": "Có chương trình khuyến mãi nào không?",
        "answer": "Hiện tại chúng tôi đang có chương trình giảm giá 20% cho tất cả sách văn học và sách thiếu nhi. Ngoài ra, khi mua từ 2 cuốn sách trở lên, bạn sẽ được giảm thêm 5%. Thành viên VIP của hiệu sách được hưởng ưu đãi đặc biệt với 10% giảm giá cho mọi đơn hàng."
    },
    {
        "question": "Làm thế nào để trở thành thành viên của hiệu sách?",
        "answer": "Để trở thành thành viên, bạn cần điền vào form đăng ký tại quầy dịch vụ khách hàng hoặc đăng ký online trên website của chúng tôi. Phí thành viên hàng năm là 100.000 VNĐ, đổi lại bạn sẽ nhận được nhiều ưu đãi hấp dẫn và tích luỹ điểm thưởng cho mỗi lần mua hàng."
    },
    {
        "question": "Hiệu sách có dịch vụ giao hàng không?",
        "answer": "Có, chúng tôi cung cấp dịch vụ giao hàng miễn phí trong nội thành với đơn hàng từ 200.000 VNĐ trở lên. Với đơn hàng dưới 200.000 VNĐ, phí giao hàng là 20.000 VNĐ. Thời gian giao hàng thông thường từ 1-3 ngày làm việc tùy thuộc vào khu vực."
    },
    {
        "question": "Làm thế nào để tìm một cuốn sách cụ thể?",
        "answer": "Bạn có thể tìm kiếm sách thông qua công cụ tìm kiếm trên website hoặc ứng dụng di động của chúng tôi. Tại cửa hàng, bạn có thể hỏi nhân viên hoặc sử dụng màn hình tìm kiếm đặt tại các vị trí trong cửa hàng. Bạn có thể tìm theo tên sách, tác giả, thể loại hoặc mã ISBN."
    },
    {
        "question": "Hiệu sách có nhận đặt sách nước ngoài không?",
        "answer": "Có, chúng tôi nhận đặt sách nước ngoài theo yêu cầu. Thời gian nhập sách thường từ 2-4 tuần tùy thuộc vào nhà xuất bản và quốc gia. Đối với sách đặt từ nước ngoài, bạn cần đặt cọc 50% giá trị đơn hàng."
    },
    {
        "question": "Có khu vực đọc sách tại hiệu sách không?",
        "answer": "Có, hiệu sách của chúng tôi có khu vực đọc sách rộng rãi, thoáng mát với ghế ngồi thoải mái. Bạn có thể đọc sách thoải mái tại đây và còn có quầy cà phê phục vụ đồ uống nếu bạn muốn thư giãn trong thời gian đọc sách."
    },
    {
        "question": "Hiệu sách có bán ebook không?",
        "answer": "Có, chúng tôi cung cấp ebook thông qua nền tảng đọc sách điện tử riêng. Bạn có thể mua ebook với giá ưu đãi hơn so với sách giấy và đọc trên nhiều thiết bị khác nhau. Sau khi mua, ebook sẽ được lưu trữ vĩnh viễn trong tài khoản của bạn."
    },
    {
        "question": "Làm thế nào để kiểm tra tình trạng đơn hàng?",
        "answer": "Để kiểm tra tình trạng đơn hàng, bạn có thể đăng nhập vào tài khoản trên website hoặc ứng dụng, vào mục 'Đơn hàng của tôi'. Ngoài ra, bạn có thể liên hệ với bộ phận chăm sóc khách hàng qua số hotline 1900xxxx hoặc email support@bookstore.com.vn."
    },
    {
        "question": "Hiệu sách có tổ chức sự kiện gặp gỡ tác giả không?",
        "answer": "Có, chúng tôi thường xuyên tổ chức các sự kiện gặp gỡ tác giả, ra mắt sách và ký tặng sách. Thông tin về các sự kiện này được cập nhật trên website, fanpage và gửi email thông báo cho các thành viên. Bạn có thể đăng ký tham gia miễn phí."
    },
    {
        "question": "Sách bán chạy nhất hiện nay là gì?",
        "answer": "Hiện tại, những cuốn sách bán chạy nhất tại hiệu sách chúng tôi bao gồm: 'Cây Cam Ngọt Của Tôi', 'Nhà Giả Kim', 'Tôi Tài Giỏi, Bạn Cũng Thế', 'Đắc Nhân Tâm' và 'Hành Trình Về Phương Đông'. Danh sách này được cập nhật hàng tuần dựa trên doanh số bán hàng."
    },
    {
        "question": "Có thể thanh toán bằng những phương thức nào?",
        "answer": "Chúng tôi chấp nhận nhiều phương thức thanh toán khác nhau bao gồm: tiền mặt, thẻ tín dụng/ghi nợ, chuyển khoản ngân hàng, ví điện tử (MoMo, ZaloPay, VNPay), và thanh toán khi nhận hàng (COD). Tất cả các giao dịch online đều được bảo mật."
    },
    {
        "question": "Hiệu sách có sách ngoại ngữ không?",
        "answer": "Có, chúng tôi có khu vực riêng dành cho sách ngoại ngữ với nhiều ngôn ngữ khác nhau như Anh, Pháp, Nhật, Hàn, Trung... Sách ngoại ngữ bao gồm sách học ngôn ngữ, văn học, kỹ năng, và nhiều thể loại khác."
    },
    {
        "question": "Có thể tặng sách qua hiệu sách được không?",
        "answer": "Có, chúng tôi cung cấp dịch vụ tặng sách với gói quà tặng đẹp mắt. Bạn có thể chọn sách, viết thiệp chúc mừng và chúng tôi sẽ giao đến người nhận theo địa chỉ và thời gian bạn yêu cầu. Dịch vụ này có thêm phí gói quà từ 20.000 VNĐ tùy theo loại gói quà bạn chọn."
    },
    {
        "question": "Hiệu sách có bán văn phòng phẩm không?",
        "answer": "Có, ngoài sách, chúng tôi còn kinh doanh đa dạng các loại văn phòng phẩm như bút, vở, sổ tay, bookmark, bìa sách, đồ dùng học tập và văn phòng. Tất cả đều được chọn lọc từ các thương hiệu uy tín và có thiết kế đẹp mắt."
    },
    {
        "question": "Sách dành cho trẻ em có những loại nào?",
        "answer": "Chúng tôi có đa dạng sách dành cho trẻ em ở mọi lứa tuổi, từ sách tranh, truyện tranh, sách tô màu, sách nổi 3D cho trẻ nhỏ đến sách kỹ năng, sách khoa học, và văn học thiếu nhi cho trẻ lớn hơn. Các sách đều được lựa chọn cẩn thận về nội dung và chất lượng in ấn."
    },
    {
        "question": "Làm thế nào để góp ý, khiếu nại về dịch vụ?",
        "answer": "Bạn có thể góp ý hoặc khiếu nại về dịch vụ thông qua form góp ý trên website, gửi email đến feedback@bookstore.com.vn, hoặc liên hệ trực tiếp với quản lý cửa hàng. Mọi góp ý của bạn đều được chúng tôi ghi nhận và phản hồi trong vòng 24 giờ làm việc."
    },
    {
        "question": "Hiệu sách có chương trình cho trường học không?",
        "answer": "Có, chúng tôi có chương trình đặc biệt dành cho các trường học với ưu đãi giảm giá từ 15-25% cho đơn hàng số lượng lớn. Chúng tôi cũng tổ chức các buổi giới thiệu sách, hội sách và hoạt động khuyến đọc tại trường học. Các trường quan tâm có thể liên hệ với bộ phận hợp tác để biết thêm chi tiết."
    }
]

# Khởi tạo vectorizer để so sánh câu hỏi
vectorizer = TfidfVectorizer()
# Lấy danh sách câu hỏi
questions = [item["question"] for item in faq_data]
# Fit vectorizer với danh sách câu hỏi
question_vectors = vectorizer.fit_transform(questions)

class ChatRequest(BaseModel):
    prompt: str
    max_tokens: int = 512
    temperature: float = 0.8
    similarity_threshold: float = 0.8  # Ngưỡng tương đồng để sử dụng câu trả lời có sẵn

@app.post("/chat")
def chat_endpoint(request: ChatRequest):
    try:
        # Kiểm tra xem câu hỏi có tương tự với câu hỏi trong FAQ không
        user_question_vector = vectorizer.transform([request.prompt])
        similarities = cosine_similarity(user_question_vector, question_vectors).flatten()
        
        # Tìm câu hỏi có độ tương đồng cao nhất
        max_similarity_idx = np.argmax(similarities)
        max_similarity = similarities[max_similarity_idx]
        
        # Nếu độ tương đồng vượt ngưỡng, trả về câu trả lời có sẵn
        if max_similarity >= request.similarity_threshold:
            return {
                "response": faq_data[max_similarity_idx]["answer"],
                "source": "faq",
                "similarity": float(max_similarity),
                "matched_question": faq_data[max_similarity_idx]["question"]
            }
        
        # Nếu không tìm thấy câu hỏi tương tự, sử dụng LLM để trả lời
        system_message = "<|im_start|>system\nBạn là một trợ lí AI hữu ích chuyên về cửa hàng sách. Hãy trả lời người dùng một cách chính xác bằng tiếng Việt.\n<|im_end|>"
        user_message = f"<|im_start|>user\n{request.prompt}<|im_end|>"
        assistant_start = "<|im_start|>assistant\n"
        
        full_prompt = f"{system_message}\n{user_message}\n{assistant_start}"
        
        result = llm(
            prompt=full_prompt, 
            max_tokens=request.max_tokens,
            temperature=request.temperature,
            stop=["<|im_end|>", "<|im_start|>"]
        )
        
        response_text = result["choices"][0]["text"]
        
        return {
            "response": response_text,
            "source": "llm",
            "best_match_similarity": float(max_similarity),
            "best_match_question": faq_data[max_similarity_idx]["question"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi khi sinh câu trả lời: {e}")

# Endpoint để xem toàn bộ FAQ
@app.get("/faq")
def get_faq():
    return {"faq": faq_data}

# Endpoint để cập nhật một FAQ
@app.put("/faq/{index}")
def update_faq(index: int, question: str = None, answer: str = None):
    if index < 0 or index >= len(faq_data):
        raise HTTPException(status_code=404, detail="FAQ không tồn tại")
    
    if question:
        faq_data[index]["question"] = question
    if answer:
        faq_data[index]["answer"] = answer
    
    # Cập nhật lại vectorizer nếu câu hỏi thay đổi
    if question:
        questions = [item["question"] for item in faq_data]
        global question_vectors, vectorizer
        vectorizer = TfidfVectorizer()
        question_vectors = vectorizer.fit_transform(questions)
    
    return {"message": "Cập nhật thành công", "updated_faq": faq_data[index]}

# Endpoint health-check
@app.get("/")
def read_root():
    return {"message": "Bookstore Chatbot API đang hoạt động", "status": "OK"}