
(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

document.addEventListener('DOMContentLoaded', () => {
    const userExist = localStorage.getItem("userInfo");
    const loginBtn = document.getElementById("loginBtn")
    
    const logoutBtn = document.getElementById("logoutBtn")
    if(userExist){
        loginBtn.classList.add("hidden");
        logoutBtn.classList.remove("hidden")
    }else{
        logoutBtn.classList.add("hidden");
        loginBtn.classList.remove("hidden")
    }
    logoutBtn.addEventListener("click", async ()=>{
        const res = await postData("http://localhost:3000/api/users/logout");
        localStorage.removeItem("userInfo")
        window.location.href = "/frontend/index.html";
    })
    const postServiceForm = document.getElementById('postServiceForm');

    postServiceForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(postServiceForm);
        const responseData = await postData('/api/services/add', formData);

        alert(responseData); // Show a message based on the response
    });

    // Function to send POST request with form data
    // async function postData(url = '', data = new FormData()) {
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         body: data,
    //     });

    //     return response.json();
    // }
});

async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });
    return response.json();
}
