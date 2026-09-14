// Định nghĩa dự phòng cho smartresize để tránh lỗi văng script
(function($,sr){
  var debounce = function (func, threshold, execAsap) {
      var timeout;
      return function cached () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap) func.apply(obj, args);
              timeout = null;
          };
          if (timeout) clearTimeout(timeout);
          else if (execAsap) func.apply(obj, args);
          timeout = setTimeout(delayed, threshold || 100);
      };
  };
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
})(jQuery,'smartresize');

// ==========================================
// ĐẶT DÒNG 1 ĐẦU FILE ASSETS/JS/CUSTOM.JS
// ==========================================
// 1. TỰ ĐỘNG BẮT NGÔN NGỮ ĐANG CHỌN
  function handleSendEmail(e) {
  e.preventDefault();

  const emailInput = document.getElementById('email');
  const emailValue = emailInput ? emailInput.value.trim() : '';
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 1. NHẬN DIỆN NGÔN NGỮ CHÍNH XÁC THEO NÚT BẤM VÀ BIẾN LỰA CHỌN
  let langKey = 'vi';

  const submitBtnEl = document.getElementById('form-submit');
  const btnText = submitBtnEl ? submitBtnEl.innerText.trim().toUpperCase() : '';

  // Ưu tiên soi chữ thực tế đang hiển thị trên nút gửi
  if (btnText.includes('CONTACT') || btnText.includes('SUBMIT') || btnText.includes('SEND')) {
    langKey = 'en';
  } else if (btnText.includes('联系') || btnText.includes('提交') || btnText.includes('发送')) {
    langKey = 'zh';
  } else if (btnText.includes('LIÊN HỆ') || btnText.includes('GỬI')) {
    langKey = 'vi';
  } else if (window.selectedLang) {
    langKey = window.selectedLang;
  } else {
    // Phòng ngừa trường hợp khác
    const htmlLang = (document.documentElement.lang || '').toLowerCase();
    if (htmlLang.includes('zh') || htmlLang.includes('cn')) langKey = 'zh';
    else if (htmlLang.includes('en')) langKey = 'en';
    else langKey = 'vi';
  }

  // 2. BẢNG THÔNG BÁO 3 NGÔN NGỮ
  const messages = {
    invalidEmail: {
      vi: "Vui lòng nhập đúng định dạng email!",
      en: "Please enter a valid email address!",
      zh: "请输入有效的电子邮件地址！"
    },
    sending: {
      vi: "Đang gửi...",
      en: "Sending...",
      zh: "发送中..."
    },
    success: {
      vi: "Gửi thông tin thành công! MT Solar Energy sẽ liên hệ lại với bạn sớm nhất.",
      en: "Thank you! We will contact you soon.",
      zh: "发送成功！我们会尽快与您联系。"
    },
    failed: {
      vi: "Gửi thất bại! Bạn hãy kiểm tra lại cấu hình Key EmailJS nhé.",
      en: "Failed to send. Please check your EmailJS setup!",
      zh: "发送失败！请检查 EmailJS 设置。"
    }
  };

  // 3. KIỂM TRA VALIDATION EMAIL
  if (!emailValue || !emailPattern.test(emailValue)) {
    alert(messages.invalidEmail[langKey]);
    if (emailInput) emailInput.focus();
    return;
  }

  // 4. XỬ LÝ TRẠNG THÁI NÚT & GỬI EMAILJS
  const originalText = submitBtnEl ? submitBtnEl.innerText : "LIÊN HỆ";

  if (submitBtnEl) {
    submitBtnEl.innerText = messages.sending[langKey];
    submitBtnEl.disabled = true;
  }

  // Khởi tạo EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init("7C7AxQzrWJIRPFHqL");
  }

  // Gửi Email
  emailjs.send("Service_mail", "template_mt", {
    user_email: emailValue,
    message: "Khách hàng gửi yêu cầu tư vấn từ Website MT Solar Energy!"
  })
  .then(function() {
    alert(messages.success[langKey]);
    emailInput.value = "";
    if (submitBtnEl) {
      submitBtnEl.innerText = originalText;
      submitBtnEl.disabled = false;
    }
  }, function(error) {
    alert(messages.failed[langKey]);
    if (submitBtnEl) {
      submitBtnEl.innerText = originalText;
      submitBtnEl.disabled = false;
    }
  });
}

// ==========================================
// 2. BỌC AN TOÀN SCRIPT CŨ (PREVENT CRASH)
// ==========================================
$(document).ready(function() {
  if ($.fn.isotope) {
    var $container = $('.posts').isotope({
      itemSelector : '.item',
      isFitWidth: true
    });
    if ($.isFunction($.fn.smartresize)) {
      $(window).smartresize(function(){
        $container.isotope({ columnWidth: '.col-sm-3' });
      });
    }
    $('#filters').on('click', 'button', function() {
      var filterValue = $(this).attr('data-filter');
      $container.isotope({ filter: filterValue });
    });
  }

  if ($.fn.flexslider) {
    $('.flexslider').flexslider({ animation: "slide" });
  }
});

// ----------------------------------------------------
// DƯỚI ĐÂY MỚI LÀ CODE CŨ CỦA CUSTOM.JS (GIỮ NGUYÊN)
// ----------------------------------------------------

jQuery( document ).ready(function( $ ) {


	"use strict";


		$('.owl-carousel').owlCarousel({
		    items:4,
		    lazyLoad:true,
		    loop:true,
		    dots:true,
		    margin:20,
		    responsiveClass:true,
			    responsive:{
			        0:{
			            items:1,
			        },
			        600:{
			            items:2,
			        },
			        1000:{
			            items:4,
			        }
			    }
		});

 /* activate jquery isotope */
		  var $container = $('.posts').isotope({
		    itemSelector : '.item',
	    isFitWidth: true
	  });
 

		  $(window).smartresize(function(){
		    $container.isotope({
		      columnWidth: '.col-sm-3'
		    });
		  });
		  
		  $container.isotope({ filter: '*' });

		    // filter items on button click
		  $('#filters').on( 'click', 'button', function() {
		    var filterValue = $(this).attr('data-filter');
		    $container.isotope({ filter: filterValue });
		});

if ($.fn.flexslider) {
		$('#carousel').flexslider({
		    animation: "slide",
		    controlNav: false,
		    animationLoop: false,
		    slideshow: false,
		    itemWidth: 210,
		    itemMargin: 5,
		    asNavFor: '#slider'
		});
		 
		$('#slider').flexslider({
		    animation: "slide",
		    controlNav: false,
		    animationLoop: false,
		    slideshow: false,
		    sync: "#carousel"
		});
  }
});
//hàm mail góp ý
// Hàm hòm thư ý kiến hỗ trợ đa ngôn ngữ (VN | EN | 中文) - Soi trực tiếp chữ trên nút gửi
function handleMainContact(e) {
    if (e) e.preventDefault();

    // 1. Khởi tạo EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init("7C7AxQzrWJIRPFHqL");
    }

    // 2. Lấy giá trị các ô input
    const name = document.getElementById('contact_name').value.trim();
    const email = document.getElementById('contact_email').value.trim();
    const subject = document.getElementById('contact_subject').value.trim();
    const message = document.getElementById('contact_message').value.trim();

    // 3. Soi trực tiếp chữ trên nút gửi để nhận diện ngôn ngữ đang chọn
    let langKey = 'vi'; // Mặc định tiếng Việt
    
    // Tìm nút gửi của form này (bro nhớ đảm bảo button/input gửi có class hoặc nằm trong form có id là main-contact-form)
    const submitBtn = document.querySelector('#main-contact-form button[type="submit"], #main-contact-form input[type="submit"], #main-contact-form button');
    const btnText = submitBtn ? submitBtn.textContent.trim().toUpperCase() : '';

    if (btnText.includes('CONTACT') || btnText.includes('SUBMIT') || btnText.includes('SEND')) {
        langKey = 'en';
    } else if (btnText.includes('联系') || btnText.includes('提交') || btnText.includes('发送') || btnText.includes('接')) {
        langKey = 'zh';
    } else if (btnText.includes('LIÊN HỆ') || btnText.includes('GỬI')) {
        langKey = 'vi';
    } else if (window.selectedLang) {
        langKey = window.selectedLang;
    }

    // 4. Kiểm tra dữ liệu trống và thông báo bằng đúng ngôn ngữ đang chọn
    if (!name || !email || !message) {
        if (langKey === 'en') {
            alert("Please fill in all required fields!");
        } else if (langKey === 'zh') {
            alert("请填写所有必填字段！");
        } else {
            alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
        }
        return false;
    }

    // Kiểm tra định dạng email cơ bản nếu cần
    if (!email.includes('@') || email.length < 5) {
        if (langKey === 'en') {
            alert("Please enter a valid email address!");
        } else if (langKey === 'zh') {
            alert("请输入有效的电子邮件地址！");
        } else {
            alert("Vui lòng nhập địa chỉ email hợp lệ!");
        }
        return false;
    }

    // 5. Thêm tiền tố ngôn ngữ vào tiêu đề email để quản trị viên dễ phân loại
    let finalSubject = subject;
    if (langKey === 'en') finalSubject = "[EN] " + subject;
    if (langKey === 'zh') finalSubject = "[CN] " + subject;

    // 6. Gửi qua EmailJS
    emailjs.send("Service_mail", "template_feedback", {
        from_name: name,
        user_email: email,
        subject: finalSubject,
        message: message
    })
    .then(function(response) {
        if (langKey === 'en') {
            alert("Feedback sent successfully! Thank you for your contribution.");
        } else if (langKey === 'zh') {
            alert("意见发送成功！感谢您的贡献。");
        } else {
            alert("Gửi ý kiến thành công! Cảm ơn đóng góp của bạn.");
        }
        document.getElementById('main-contact-form').reset();
    })
    .catch(function(error) {
        console.error("Lỗi:", error);
        if (langKey === 'en') {
            alert("Failed to send, please try again later!");
        } else if (langKey === 'zh') {
            alert("发送失败，请稍后重试！");
        } else {
            alert("Gửi thất bại, vui lòng thử lại sau!");
        }
    });

    return false;
}

// Bắt sự kiện bấm nút 3 gạch để xổ menu trên mobile
document.addEventListener("DOMContentLoaded", function() {
    const menuTrigger = document.querySelector('.menu-trigger');
    const navMenu = document.querySelector('.header-area .main-nav .nav');

    if (menuTrigger && navMenu) {
        menuTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            // Kiểm tra nếu đang ẩn thì hiện, đang hiện thì ẩn
            if (navMenu.style.display === 'flex' || navMenu.style.display === 'block') {
                navMenu.style.display = 'none';
            } else {
                navMenu.style.display = 'flex';
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const menuTrigger = document.querySelector('.menu-trigger');
    const navMenu = document.querySelector('.header-area .main-nav .nav');

    if (menuTrigger && navMenu) {
        menuTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            // Kiểm tra trạng thái hiện tại để ẩn/hiện trực tiếp
            if (navMenu.style.display === 'flex' || navMenu.style.display === 'block') {
                navMenu.style.display = 'none';
            } else {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '70px';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.backgroundColor = '#ffffff';
                navMenu.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
                navMenu.style.padding = '20px 0';
                navMenu.style.textAlign = 'center';
                navMenu.style.zIndex = '999';
            }
        });
    }
});