// MENU BURGER //
let burger = document.getElementById('burgerClick')
let ul = document.querySelector('ul')

burger.addEventListener('click',displayNav);
document.addEventListener('scroll',hideSroll)

function displayNav() {
    nav.classList.toggle('displayNone')

}

function hideSroll(){
    nav.classList.add('displayNone')
}

//CONNECTION A L API pour le résumé global de la série //

async function getgot() {
    let response = await fetch('https://api.tvmaze.com/shows/82');
    if(response.ok === true){
      let got = await response.json();
      return got;
      console.log(got);
    
    }
  }

  function ficheGot(got){
      const ficheGot = document.getElementById('ficheGot');
      let summary = document.createElement('p')
      let titleElement = document.createElement('h2');
      let imgElement = document.createElement('img');
      let titleTxt = document.createTextNode(got.name);
      imgElement.setAttribute('src',got.image.original);
      imgElement.classList.add('imgFicheGot')
      ficheGot.appendChild(titleElement);
      ficheGot.appendChild(imgElement);
      ficheGot.appendChild(summary);
      titleElement.appendChild(titleTxt);
      summary.innerHTML = got.summary ;
      summary.classList.add('pFicheGot');
      
      
  }
  
  
  
  
  getgot().then(got => ficheGot(got));

  //CONNECTION A L API pour la partie épisodes //

async function getgotEpisodes() {
  let response = await fetch('https://api.tvmaze.com/shows/82/episodes');
  if(response.ok === true){
    let gotEpisodes = await response.json();
    return gotEpisodes;
    
  }
}

async function ficheGotEpisodes(gotEpisodes){
  const episodesGot = document.getElementById('episodesGot');
  let lastID = '';
  gotEpisodes.forEach((gotEpisode ) => {
    //Partie qui récupere l'image et le nom de l'épisode//
      let stars = document.getElementById('stars');
      let articleElement = document.createElement('article')
      let episodeName = document.createElement('h3');
      let imgElement = document.createElement('img');
      imgElement.setAttribute('src',gotEpisode.image.medium);
      let episodeTxt = document.createTextNode(gotEpisode.name); 
      episodeName.appendChild(episodeTxt);
      episodesGot.appendChild(articleElement);
      articleElement.appendChild(episodeName);
      articleElement.appendChild(imgElement);
      articleElement.appendChild(stars);  
      articleElement.classList.add('articleElement');

      //Partie qui fait pop au clic sur le titre la pop up avec le résumé//

      episodeName.addEventListener('click' , () => {
        if(lastID != '')
          lastID.classList.add('modalNone');
      const modalEpisode = document.getElementById("modal");
      let modalElement = document.createElement('article');
      let sumEpisodes = document.createElement('p');
      let sumEpisodeTxt = document.createTextNode(gotEpisode.summary);
      sumEpisodes.appendChild(sumEpisodeTxt);
      modalElement.appendChild(sumEpisodes);
      modalEpisode.appendChild(modalElement);
      sumEpisodes.innerHTML = gotEpisode.summary ;
      modalElement.classList.add('modalElement');
      articleElement.appendChild(modalElement);
      lastID = modalElement;

      document.addEventListener('scroll', () =>{
        lastID.classList.add('modalNone')
      })
      })
   
    })
    
  }  
getgotEpisodes().then(gotEpisodes => ficheGotEpisodes(gotEpisodes));


