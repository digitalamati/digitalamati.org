var ref = new Firebase("https://digital-amati.firebaseio.com");
$("#login-button").click(function(){
    ref.authWithPassword({
        email    : $("#login-email").val(),
        password : $("#login-password").val()
    }, function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
            $("#login-error").show();
            $("#login-error").html(error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
            $("#account-modal").modal("toggle");
            $("#logged-out-navbar").toggle();
            $("#logged-in-navbar").toggle();
            $("#profile-link").html(authData.password.email);
        }
    });
    console.log($("#login-email").val());
});

$("#register-button").click(function(){
    $(".login .alert").hide();
    if ($("#register-password").val() != $("#register-password-again").val()){
        $("#register-error").show();
        $("#register-error").html("Error: Passwords don't match,");
        return;
    }
    ref.createUser({
        email    : $("#register-email").val(),
        password : $("#register-password").val()
    }, function(error, userData) {
        if (error) {
            console.log("Error creating user:", error);
            $("#register-error").show();
            $("#register-error").html(error);

        } else {
            console.log("Successfully created user account with uid:", userData.uid);
            $("#register-success").show();
            $("#register-success").html("Welcome, " + $("#register-email").val());
        }
    });
});
$("#reset-email-button").click(function(){
    $(".login .alert").hide();
    ref.resetPassword({
        email    : $("#reset-password-email").val()
    }, function(error, userData) {
        if (error) {
            console.log("Error creating user:", error);
            $("#reset-password-error").show();
            $("#reset-password-error").html(error);

        } else {
            $("#reset-password-info").show();
            $("#reset-password-info").html("Please check your email for your temporary password and enter it above with your new password.");
            $(".reset-password-email").toggle();
            $(".reset-password-password").toggle();
            $("#reset-password-button").toggle();
            $("#reset-email-button").toggle();
            $("#reset-password-button").click(function(){
                if ($("#reset-password-password").val() != $("#reset-password-password-again").val()){
                    $("#reset-password-error").show();
                    $("#reset-password-error").html("Error: Passwords don't match,");
                    return;
                }
                ref.changePassword({
                    email    : $("#reset-password-email").val(),
                    oldPassword : $("#reset-password-temporary-password").val(),
                    newPassword : $("#reset-password-password").val()
                }, function(error) {
                    $("#reset-password-info").hide();
                    if (error === null) {
                        $("#reset-password-success").show();
                        $("#reset-password-success").html("Password reset successfully");
                        $(".reset-password-email").toggle();
                        $(".reset-password-password").toggle();
                        $("#reset-password-button").toggle();
                        $("#reset-email-button").toggle();
                        $("#reset-password-email").val("");
                    } else {
                        $("#reset-password-error").show();
                        $("#reset-password-error").html(error);
                    }
                });
            });

        }
    });
});

$(".register-login-toggle").click(function(){
    $("#login-form").toggle();
    $("#registration-form").toggle();
});
$(".reset-login-toggle").click(function(){
    $("#login-form").toggle();
    $("#reset-password-form").toggle();
});
