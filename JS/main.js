document.addEventListener('DOMContentLoaded', function() {
    // 获取所有需要的DOM元素
    const imageInput = document.getElementById('imageInput');
    const previewImage = document.getElementById('previewImage');
    const formatSelect = document.getElementById('formatSelect');
    const convertBtn = document.getElementById('convertBtn');
    const languageSelect = document.getElementById('languageSelect');

    // 语言相关元素
    const titleElement = document.getElementById('title');
    const selectImageElement = document.getElementById('selectImage');
    const selectFormatElement = document.getElementById('selectFormat');
    const convertBtnElement = document.getElementById('convertBtn');

    // 更新页面文本的函数
    function updatePageLanguage(lang) {
        document.documentElement.lang = lang;
        titleElement.textContent = translations[lang].title;
        selectImageElement.textContent = translations[lang].selectImage;
        selectFormatElement.textContent = translations[lang].selectFormat;
        convertBtnElement.textContent = translations[lang].convertAndDownload;
    }

    // 语言切换处理
    languageSelect.addEventListener('change', function(e) {
        updatePageLanguage(e.target.value);
    });

    // 初始化默认语言
    updatePageLanguage('zh');

    // 处理图片上传和预览
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'inline-block';
            }
            reader.readAsDataURL(file);
        }
    });

    // 处理图片转换和下载
    convertBtn.addEventListener('click', function() {
        if (!previewImage.src) {
            const currentLang = document.documentElement.lang;
            alert(translations[currentLang].uploadFirst);
            return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = previewImage.naturalWidth;
        canvas.height = previewImage.naturalHeight;
        
        ctx.drawImage(previewImage, 0, 0);
        
        const format = formatSelect.value;
        const mimeType = `image/${format}`;
        
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `converted-image.${format}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, mimeType);
    });
});