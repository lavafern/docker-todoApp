async function loadUserData(data) {

    const table = document.querySelector('#list1 li')

    console.log('data :',data);

    if (data.length < 1) {
        table.innerHTML = "<tr><td class='no data'> no data </tr></td>"
    } else {
        let tabledata = ``
        
        for (const iterator of data) {
            tabledata += ` <h2>${iterator.task_name} <span class ='listbutton' > <button style="margin-left: 5em" type="button" class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button> </span> </h2>`
        }

        table.innerHTML = tabledata 
    }
}

function getObject() {
    const scriptElement = document.getElementById('objsrc');
    console.log(scriptElement);

    if (scriptElement) {
        
        const objectinString = scriptElement.getAttribute('data-mytaskobject');
        const parsedObjectinString = JSON.parse(objectinString)
        
        
        return parsedObjectinString
    }

}

loadUserData(getObject())




console.log('wow');