function generatepassword(){
    const length = 12;
    const uppercasechar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercasechar = 'abcdefghijklmnopqrstuvwxyz';
    const numberchars = '0123456789';
    const specialchars = '!@#$%^&*()_+?}{[]~*-<>?/';

    const charpool = uppercasechar + lowercasechar + numberchars +specialchars;

    let password ='';

    for (let i = 0; i < length; i++){
        const randomIndex = Math.floor(Math.random()*charpool.length);
        password += charpool[randomIndex]
    }

    document.getElementById('Password').innerText = password;
}