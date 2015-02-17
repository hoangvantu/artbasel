/*
 *
 * login validation
 *
 * */

// var apiBaseURL = 'http://dev.artlock.co';//window.location.origin;
var apiBaseURL = 'http://dev.artlock.co';

if (typeof(Storage) === "undefined") {
    alert('Sorry! Your web browser not support, please upgrade browser !');
};




$.ajax({
    url: apiBaseURL + '/api/user/current',
    type: "get",
    data: {token: getCookie('tokenId')},
    success: function(data) {
        console.log(data);
    },
    error: function(err) {
        console.log(err);
    }
});


function signInValidate(form) {
    $('.errors').remove();
    // var msg = '';
    // if ($.trim($('.signin .email').val()) == '' || $('.signin .password').val() == '') {
    //     msg = 'Both fields are required';
    //     if ($.trim($('.signin .email').val()) == '') $('.signin .email').addClass('form-error-field');
    //     if ($('.signin .password').val() == '') $('.signin .password').addClass('form-error-field');
    // }
    // else if (!IsEmail($.trim($('.signin .email').val()))) {
    //     msg = 'Incorrect email address or<br /> password. Please try again.';
    //     $('.signin .email').addClass('form-error-field');
    //     $('.signin .password').addClass('form-error-field');
    // }
    // else {
    //     $('.signin .email').removeClass('form-error-field');
    //     $('.signin .password').removeClass('form-error-field');
    // }
    // if (msg != '') {
    //     $('.signin .secHeading').after('<div class="errors"></div>');
    //     $('.errors').html(msg);
    //     $('.errors').slideDown();
    //     return false;
    // }
    // else {
    $.ajax({
        url: apiBaseURL + "/api/loginOut",
        type: "post",
        data: $(form).parent().serialize(),
        //contentType: "application/json; charset=utf-8",
        dataType: 'json',
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
            setCookie('tokenId', data, 7);
            // console.log('Token id: ', getCookie('tokenId'));
            alert('Send to Watch list successful');
            // localStorage.setItem('User', data);
        },
        error: function(err) {
            console.log(err);
            alert('Login failed');
            // $('.signin .secHeading').after('<div class="errors"></div>');
            // $('.errors').html('Sorry '+JSON.parse(err.responseText).error);
            $('.errors').slideDown();
        }
    });
    //return false;
    //}
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

    /*
     *
     * SignUp validation
     *
     * */


function signUpValidate(form) {
    $('.errors').remove();
    var msgs = [];
    var msg = '';
    msg = checkEmail();
    if (msg != '') {
        msgs.push(msg);
        $('.signup .email').addClass('form-error-field');
        msg = '';
    } else {
        $('.signup .email').removeClass('form-error-field');
    }
    msg = checkPass();
    if (msg != '') {
        msgs.push(msg);
        $('.signup .password').addClass('form-error-field');
        msg = '';
    } else {
        $('.signup .password').removeClass('form-error-field');
    }
    msg = checkConfPass();
    if (msg != '') {
        msgs.push(msg);
        $('.signup .conf_password').addClass('form-error-field');
        msg = '';
    } else {
        $('.signup .conf_password').removeClass('form-error-field');
    }
    if (msgs.length > 0) {
        msg = msgs.join('');
        $('.signup .secHeading').after('<div class="errors"></div>');
        $('.errors').html(msg);
        $('.errors').slideDown();
        msgs = [];
        return false;
    } else {
        $('.signup .email').removeClass('form-error-field');
        $('.signup .password').removeClass('form-error-field');
        $('.signup .conf_password').removeClass('form-error-field');
        msgs = [];
        $.ajax({
            url: apiBaseURL + "/api/auth/signUpClick",
            type: "post",
            data: $(form).parent().serialize(),
            //contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(data) {
                console.log(data);
                if (data) {
                    window.location.href = '/auth/agree-terms';
                }
            },
            error: function(err) {
                console.log(err);
                $('.signup .secHeading').after('<div class="errors"></div>');
                $('.errors').html('Sorry, ' + JSON.parse(err.responseText).error);
                $('.errors').slideDown();
            }
        });
        return false;
    }
}



function changePassword(form) {
    $('.errors').remove();
    var msgs = [];
    var msg = '';
    msg = checkPass();
    if (msg != '') {
        msgs.push(msg);
        $('.signup .password').addClass('form-error-field');
        msg = '';
    } else {
        $('.signup .password').removeClass('form-error-field');
    }
    msg = checkConfPass();
    if (msg != '') {
        msgs.push(msg);
        $('.signup .conf_password').addClass('form-error-field');
        msg = '';
    } else {
        $('.signup .conf_password').removeClass('form-error-field');
    }
    if (msgs.length > 0) {
        msg = msgs.join('');
        $('.signup .secHeading').after('<div class="errors"></div>');
        $('.errors').html(msg);
        $('.errors').slideDown();
        msgs = [];
        return false;
    } else {

        $('.signup .password').removeClass('form-error-field');
        $('.signup .conf_password').removeClass('form-error-field');
        msgs = [];
        $.ajax({
            url: apiBaseURL + "/api/auth/changePasswordClick",
            type: "post",
            data: $(form).parent().serialize(),
            //contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(data) {
                if (data) {
                    $('.signup .password').remove();
                    $('.signup .conf_password').remove();
                    $('.signup .singButton').remove();

                    $('.signup .secHeading').after('<div class="errors"></div>');
                    $('.errors').html('Password Changed Successfully');
                    $('.errors').slideDown();
                    //window.location.href = '/auth/agree-terms';
                }
            },
            error: function(err) {
                $('.signup .secHeading').after('<div class="errors"></div>');
                $('.errors').html('Sorry !! ' + JSON.parse(err.responseText).error);
                $('.errors').slideDown();
            }
        });

        $('.signup .password').val('');
        $('.signup .conf_password').val('');
        return false;
    }
}







/*
 * sends e-mail verification
 * */
function emailVerification(form) {
    $('.errors').remove();
    var data = {
        _id: $('#user_id').val()
    };
    console.log("ajax request fired.....email verification ", data);
    $.ajax({
        url: apiBaseURL + "/api/auth/signUp",
        type: "post",
        data: data,
        //contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(data) {
            console.log("Email send ----", data);
            window.location.href = "/auth/email-verification";
        },
        error: function(err) {
            $('.email-verification .secHeading').after('<div class="errors"></div>');
            $('.errors').html('Sorry !! ' + JSON.parse(err.responseText).error);
            $('.errors').slideDown();
        }
    });
}


function reSendVerification(_id) {
    $('.errors').remove();
    var data = {
        _id: $('#user_id').val()
    };
    console.log("ajax request fired.....email verification ", data);
    $.ajax({
        url: apiBaseURL + "/api/auth/reSendVerification",
        type: "post",
        data: data,
        //contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(data) {
            console.log("Email send ----", data);
            $('.email-verification .secHeading').after('<div class="errors"></div>');
            $('.errors').html("Verification Mail Send");
            $('.errors').slideDown();
            // window.location.href="/auth/email-verification";
        },
        error: function(err) {
            $('.email-verification .secHeading').after('<div class="errors"></div>');
            $('.errors').html('Sorry !! ' + JSON.parse(err.responseText).error);
            $('.errors').slideDown();
        }
    });
}








function changeEmailValidate(form) {
    $('.errors').remove();
    var msg = '';
    if ($.trim($('.changeemail .email').val()) == '' || $('.changeemail .password').val() == '') {
        msg = 'Both fields are required';
        if ($.trim($('.changeemail .email').val()) == '') {
            $('.changeemail .email').addClass('form-error-field');
        }
        if ($('.changeemail .password').val() == '') {
            $('.changeemail .password').addClass('form-error-field');
        }
    } else if (!IsEmail($.trim($('.changeemail .email').val()))) {
        msg = 'Incorrect email address or<br /> password. Please try again.';
        $('.changeemail .email').addClass('form-error-field');
        $('.changeemail .password').addClass('form-error-field');
    } else {
        $('.changeemail .email').removeClass('form-error-field');
        $('.changeemail .password').removeClass('form-error-field');
    }


    if (msg != '') {
        $('.changeemail .secHeading').after('<div class="errors"></div>');
        $('.errors').html(msg);
        $('.errors').slideDown();
        return false;
    } else {
        $('.changeemail .email').removeClass('form-error-field');
        $('.changeemail .password').removeClass('form-error-field');

        console.log("ajax request fired.....change email");
        $.ajax({
            url: apiBaseURL + "/api/auth/changeEmail",
            type: "post",
            data: $(form).parent().serialize(),
            //contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(data) {
                console.log("Email changed ----", data);
                if (data)
                    window.location.href = '/auth/email-verification';
            },
            error: function(err) {
                $('.changeemail .secHeading').after('<div class="errors"></div>');
                $('.errors').html('Sorry !! ' + JSON.parse(err.responseText).error);
                $('.errors').slideDown();
            }
        });
        return false;
    }
}


function profileValidate(form) {

    $('.errors').remove();

    var msgs = [];
    var msg = '';

    var firstname = $.trim($('.complete-profile .firstname').val());
    var lastname = $.trim($('.complete-profile .lastname').val());
    var country = $.trim($('.complete-profile .country').val());
    var zip = $.trim($('.complete-profile .zip').val());


    if (firstname == '') {
        msg = 'First name is required'
    }
    if (msg != '') {
        msgs.push(msg);
        $('.complete-profile .firstname').addClass('form-error-field');
        msg = '';
    } else {
        $('.complete-profile .firstname').removeClass('form-error-field');
    }


    if (lastname == '') {
        msg = 'Last name is required'
    }
    if (msg != '') {
        msgs.push(msg);
        $('.complete-profile .lastname').addClass('form-error-field');
        msg = '';
    } else {
        $('.complete-profile .lastname').removeClass('form-error-field');
    }


    if (country == '') {
        msg = 'Your Country name is required'
    }
    if (msg != '') {
        msgs.push(msg);
        $('.complete-profile .country').addClass('form-error-field');
        msg = '';
    } else {
        $('.complete-profile .country').removeClass('form-error-field');
    }

    if (zip == '') {
        msg = 'Zipcode is required'
    }
    if (msg != '') {
        msgs.push(msg);
        $('.complete-profile .zip').addClass('form-error-field');
        msg = '';
    } else {
        $('.complete-profile .zip').removeClass('form-error-field');
    }

    if (msgs.length > 0) {

        msg = msgs.join('<br />');

        $('.complete-profile .secHeading').after('<div class="errors"></div>');

        $('.errors').html(msg);

        $('.errors').slideDown();

        msgs = [];

        return false;

    } else {

        $('.complete-profile .firstname').removeClass('form-error-field');
        $('.complete-profile .lastname').removeClass('form-error-field');
        $('.complete-profile .country').removeClass('form-error-field');
        $('.complete-profile .zip').removeClass('form-error-field');
        msgs = [];

        /*$('body').removeClass('cbp-spmenu-push-toleft');
         $('body').removeClass('bg-gradiant');
         $('body').addClass('cbp-spmenu-push');
         $('body').css('background-color','#fff');*/

        console.log("ajax request fired.....Basic info");
        $.ajax({
            url: apiBaseURL + "/api/auth/basicInfo",
            type: "post",
            data: $(form).parent().serialize(),
            //contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(data) {
                console.log("Profile updated ----", data);
                window.location.href = '/user/mainscreen';
            },
            error: function(err) {
                alert(err + " did happen, please retry");
            }
        });
        return false;
    }
}



function forgotValidate(form) {

    $('.errors').remove();

    var msg = '';

    var email = $.trim($('.forgot .email').val());

    $("#service_msg").html(email);



    if (email == '') {

        msg = 'Email is required<br />';

        $('.forgot .email').addClass('form-error-field');

    } else if (!IsEmail(email)) {

        msg = 'Email is not in a valid format<br />';

        $('.forgot .email').addClass('form-error-field');

    } else {

        $('.forgot .email').removeClass('form-error-field');

    }



    if (msg != '') {

        $('.forgot .secHeading').after('<div class="errors"></div>');

        $('.errors').html(msg);

        $('.errors').slideDown();

        return false;

    } else {
        console.log("ajax request fired.....forgot Password");
        $.ajax({
            url: apiBaseURL + "/api/auth/changePassword",
            type: "post",
            data: $(form).parent().serialize(),
            //contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function(data) {
                console.log("Profile updated ----", data);
                showDiv('reset-message', true)
            },
            error: function(err) {
                $('.forgot .secHeading').after('<div class="errors"></div>');
                $('.errors').html('Sorry !! ' + JSON.parse(err.responseText).error);
                $('.errors').slideDown();
            }
        });
        return false;
    }
}
