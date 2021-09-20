const search = document.getElementById("searchTxt")
const fromEL = document.getElementById("form");
const userEl = document.getElementById("user");
const headerTitle = document.getElementById("headerTitle");
const parentContainer = document.getElementsByClassName("page-container");



//submit handler and fetch the data
const submitHandler = async (e) =>  {
    e.preventDefault();
    
    //get the search term
    let searchTerm = search.value;
    //fetch the data based on the value
    if(searchTerm.trim()) {
        const response = await fetch(`https://api.github.com/users/${searchTerm}`);
        const result = await response.json();
        
        if(result.message === "Not Found" || result.login === "null") {
                headerTitle.innerHTML=`<h2>There is no result for "${searchTerm}" Try Again </h2>`;
                headerTitle.classList.add("title");
                //delete The message 
                setTimeout(()=> {
                    headerTitle.innerHTML="";
                    headerTitle.classList.remove("title");
                    }, 3000)
        } else {
            userEl.style.visibility="visible";
            showUser(result);
            
        } 

    }  else {
        headerTitle.innerHTML=`<h2>Please Type The Name of the user</h2>`;
        headerTitle.classList.add("title");
        //delete The message 
        setTimeout(()=> {
        headerTitle.innerHTML="";
        headerTitle.classList.remove("title");
        }, 3000)
        
    }


}



//Show the user into the DOM
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