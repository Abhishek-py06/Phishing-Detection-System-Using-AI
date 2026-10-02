document.addEventListener("DOMContentLoaded", function(){
    const headings = [
        "Welcome Back!",
        "Sign In to Continue.",
        "Access Your Account!",
    ];
    const speed = 100;
    const eraseSpeed = 50;
    const delay = 1500;
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const headingElement = document.querySelector(".container0 h1");
    
    function typeEffect(){
        if(headingElement){
            const currentText = headings[textIndex];
            headingElement.innerHTML = currentText.substring(0, charIndex) + "<span class='cursor'>|</span>";
            
            if (!isDeleting && charIndex < currentText.length){
                charIndex++;
                setTimeout(typeEffect, eraseSpeed);
            }
            else if(isDeleting && charIndex > 0){
                charIndex--;
                setTimeout(typeEffect, eraseSpeed);
            }
            else if(!isDeleting && charIndex === currentText.length){
                setTimeout(() => { isDeleting = true; typeEffect(); }, delay);
            }
            else if(isDeleting && charIndex ===0){
                isDeleting = false;
                textIndex = (textIndex + 1)%headings.length;
                setTimeout(typeEffect, speed); 
            }
        }
    }
    typeEffect();
});