console.log($("h1").css("color"));
$("h1").html("<em>Bye<em/>");
$("button").text("Don't click me!");
$("a").attr("href", "https://www.yahoo.com");
$(document).keydown(function(event)
{
    $("h1").text(event.key);
    $("h1").addClass("big-title");
});
$("h1").on("mouseover", function()
{
    $("h1").css("color","green");
});
$("h1").after("<button>New</button>");
$("button").click(function()
{
    $("h1").fadeToggle();
})