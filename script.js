// [x] function to fetch the data 
// [x] get the value of input
// [x]  Create an event on submit button
// [x] get the ids
// [x] function to display the data (it going to be inside the fetching data)
// [x] transform the date format to readable format


// get les donner
const search = document.getElementById("searchTxt")
const fromEL = document.getElementById("form");
const userEl = document.getElementById("user");



//submit handler 
const submitHandler = async (e) =>  {
    e.preventDefault();
    
    //get the search term
    const searchTerm = search.value;
    console.log(searchTerm)
    //fetch the data based on the value
    if(searchTerm) {
        const response = await fetch(`https://api.github.com/users/${searchTerm}`);
        const result = await response.json();
        showUser(result);
        console.log(result)
    }

}



const showUser = (user) => {
    const {name, login, company, avatar_url, followers, following, created_at} = user;

    userEl.innerHTML=`
    
        <article class="user">
            <img src="${avatar_url}" alt="${name}">
            <div class="user-info">
                <h1>${name}</h1>
                <h3>${login}</h3>
                <h2>This profile has no bio</h2>
            </div>
        </article>
    
    `;

}


//add Event Listener
fromEL.addEventListener("submit", submitHandler);