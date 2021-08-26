const template = document.createElement('template');
// I decided to add a little bit of styling here
template.innerHTML = `
<style>
.todoItem{
    padding:10px;
    width:500px;
    display:flex;
    flex-direction: column;
    align-items:center;
    border: 2px solid #000000;
    border-color: #0f1b5a;
    border-width: thick;
    margin-bottom: 20px;
}
</style>
<div class = "todoItem">
<input type='checkbox'/>
<h3></h3>
<legend></legend>
</div>`;
//testing data
// const initialValue = {
//  tasks: [
//   {
//    id: 1,
//    title: 'Paint the wall',
//    description: 'Please paint all the walls in white color',
//    checked: true,
//   },
//   {
//    id: 2,
//    title: 'Clean the site',
//    description:
//     'Please make sure you cleaned the construction site before leaving',
//    checked: false,
//   },
//   {
//    id: 3,
//    title: 'Do your dishes',
//    description: 'Please make sure you do the dishes before leaving',
//    checked: true,
//   },
//  ],
// };
const initialValue2 = {};
const projectId = Math.floor(Math.random() * 10000);
//custom element class
class todo extends HTMLElement {
 constructor() {
  super();
  let checked1 = this.getAttribute('checked');
  let checked = false;
  if (checked1 === 'true') {
   checked = true;
  } else if (checked1 === 'false') {
   checked = false;
  } else console.log('Some kind of error occured');
  this.attachShadow({ mode: 'open' });
  this.shadowRoot.appendChild(template.content.cloneNode(true));
  this.shadowRoot.querySelector('h3').innerText = this.getAttribute('title');
  this.shadowRoot.querySelector('legend').innerText =
   this.getAttribute('description');
  this.shadowRoot.querySelector('input').checked = checked;
  this.shadowRoot.querySelector('input').onclick = async () => {
   checked = !checked;
   this.setAttribute('checked', checked);
   console.log(checked);
   //sending a post request to update the state of the checked value
   try {
    await fetch('https://flexxter.de/Tasks/Save', {
     method: 'POST',
     body: JSON.stringify({
      projectId: projectId,
      taskId: parseInt(this.getAttribute('id')),
      checked: checked,
     }),
    }).then((res) => {
     if (res.status === 'success') {
      console.log('Request complete! response:', res);
     }
    });
   } catch (error) {
    console.log(error);
   }
  };
 }
 postData = async () => {};
}
window.customElements.define('todo-item', todo);
const getData = async () => {
 try {
  await fetch('https://flexxter.de/Tasks/Get')
   .then((response) => response.json())
   .then((data) => (initialValue2 = data));
 } catch (error) {}
};
getData();
document.getElementById('listOfTodos').innerHTML = initialValue2.tasks
 .map((el, idx) => {
  return `<todo-item id = "${el.id}" title = "${el.title}" description ="${el.description}" checked = ${el.checked}></todo-item>`;
 })
 .join('');

//mapping through testing data-------------------------------------------------------------------------------------------------------
// initialValue.tasks.map((el, idx) => {
//  console.log(el);
// });
// document.getElementById('listOfTodos').innerHTML = initialValue.tasks
//  .map((el, idx) => {
//   return `<todo-item id = "${el.id}" title = "${el.title}" description ="${el.description}" checked = ${el.checked}></todo-item>`;
//  })
//  .join('');
