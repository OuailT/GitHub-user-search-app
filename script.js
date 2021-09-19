// [x] function to fetch the data 
// [x] get the value of input
// [x] Create an event on submit button
// [x] get the ids
// [x] function to display the data (it going to be inside the fetching data)
// [x] transform the date format to readable format
// [] Try to give the image absolute position

// get les donner
const search = document.getElementById("searchTxt")
const fromEL = document.getElementById("form");
const userEl = document.getElementById("user");
const headerTitle = document.getElementById("headerTitle");


//submit handler 
const submitHandler = async (e) =>  {
    e.preventDefault();
    
    //get the search term
    const searchTerm = search.value;
    console.log(searchTerm)
    //fetch the data based on the value
    if(searchTerm.trim()) {
        const response = await fetch(`https://api.github.com/users/${searchTerm}`);
        const result = await response.json();
        console.log(result);

        if(result.message === "Not Found" || result.login === "null") {
                headerTitle.innerHTML=`<h2>There is no result for "${searchTerm}" Try Again </h2>`;
                headerTitle.classList.add("title");
        } else {
            userEl.style.visibility="visible";
            showUser(result);
        }
         
    }

}



const showUser = (user) => {
    const {name, login, company, avatar_url, followers, following, created_at, public_repos} = user;
    
    userEl.innerHTML=`
        <article class="user">
            <div class="user-body">
                    <img src="${avatar_url}" alt="${name}">
                    <div class="user-info">
                        <h1>${name}</h1>
                        <h3>${login}</h3>
                        <h2>This profile has no bio</h2>
                    </div>
            </div>

                <div class="follow-repos">
                    <div>
                        <span>Repos</span>
                        <h3>${public_repos} </h3>
                    </div>

                    <div>
                        <span>Followers</span>
                        <h3> ${following} </h3> 
                    </div>

                    <div>
                        <span>Following</span>
                        <h3>${followers}</h3> 
                    </div>
                
        </article>
    
    `;
    

}


//add Event Listener
fromEL.addEventListener("submit", submitHandler);