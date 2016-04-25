$(".faq-expand").click(function(){
        $(this).parent().parent().find(".faq-content").toggle();
        $(this).toggleClass("glyphicon-chevron-right");
        $(this).toggleClass("glyphicon-chevron-down");

});
