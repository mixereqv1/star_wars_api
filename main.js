const get__data__button = document.querySelector('.get__data');
const list = document.querySelector('.list');
let page__number = 1;

get__data__button.addEventListener('click', event => {
    if(list.childElementCount == 0) {
        list.innerText = "Downloading data from API...";
        let XMLrequest = new XMLHttpRequest();
        XMLrequest.open('GET','https://swapi.co/api/people/?page='+page__number,true);
        XMLrequest.send();
        XMLrequest.addEventListener('load', function() {
            if(this.status == 200) {
                list.innerText = '';
                let JSONresult = JSON.parse(XMLrequest.response);
                JSONresult = JSONresult.results;
                JSONresult.forEach(element => {
                    let li__element = document.createElement('li');
                    li__element.innerText = element.name;
                    list.appendChild(li__element);
                });    
            } else {
                list.innerText = "Error " + this.status;
            }
            let buttons__div = document.createElement('div');
            let prev__button = document.createElement('button');
            let next__button = document.createElement('button');
            let span__prev = document.createElement('span');
            let span__next = document.createElement('span');
            let page__span = document.createElement('span');

            buttons__div.className = 'buttons';
            prev__button.className = 'prev__page';
            next__button.className = 'next__page';
            page__span.className = 'page__number';

            span__prev.innerText = ' Previous page';
            span__next.innerText = 'Next page ';
            page__span.innerText = 'Page: ' + page__number;

            prev__button.addEventListener('click', a => {
                if(page__number > 1) {
                    page__number--;
                    let XMLrequest = new XMLHttpRequest();
                    XMLrequest.open('GET','https://swapi.co/api/people/?page='+page__number,true);
                    XMLrequest.send();
                    XMLrequest.addEventListener('load', function() {
                        if(this.status == 200) {
                            list.innerText = '';
                            let JSONresult = JSON.parse(XMLrequest.response);
                            JSONresult = JSONresult.results;
                            JSONresult.forEach(element => {
                                let li__element = document.createElement('li');
                                li__element.innerText = element.name;
                                list.appendChild(li__element);
                            });    
                        } else {
                            list.innerText = "Error " + this.status;
                        }
                        if(page__number == 1) {
                            prev__button.style.display = 'none';
                        }
                        if(page__number == 8) {
                            next__button.style.display = 'inline-block';
                        }
                        page__span.innerText = 'Page: ' + page__number;
                        list.appendChild(page__span);
                    })
                }
            })

            next__button.addEventListener('click', a => {
                if(page__number < 9) {
                    page__number++;
                    let XMLrequest = new XMLHttpRequest();
                    XMLrequest.open('GET','https://swapi.co/api/people/?page='+page__number,true);
                    XMLrequest.send();
                    XMLrequest.addEventListener('load', function() {
                        if(this.status == 200) {
                            list.innerText = '';
                            let JSONresult = JSON.parse(XMLrequest.response);
                            JSONresult = JSONresult.results;
                            JSONresult.forEach(element => {
                                let li__element = document.createElement('li');
                                li__element.innerText = element.name;
                                list.appendChild(li__element);
                            });    
                        } else {
                            list.innerText = "Error " + this.status;
                        }
                        if(page__number == 9) {
                            next__button.style.display = 'none';
                        }
                        if(page__number == 2) {
                            prev__button.style.display = 'inline-block';
                        }
                        page__span.innerText = 'Page: ' + page__number;
                        list.appendChild(page__span);
                    })
                }
            })

            prev__button.appendChild(span__prev);
            next__button.appendChild(span__next);
            buttons__div.appendChild(prev__button);
            buttons__div.appendChild(next__button);
            list.parentElement.appendChild(buttons__div);
            list.appendChild(page__span);

            get__data__button.style.display = 'none';
        }) 
    }
})