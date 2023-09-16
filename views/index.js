async function loadUserData(data,statusReader,statusConverted) {

    
    

    const table = document.querySelector('#list1')

    if (data.length < 1) {
        table.innerHTML = `<div class="d-flex justify-content-center" id='nodata'>
                                    <h2> Kamu belum punya kegiatan  &#128561; </h2>
                            </div>`
    } else {
        let tabledata = ``
    
        for (const iterator of data) {
            const checked = statusReader(iterator.task_status)
            const newStatus = statusConverted(iterator.task_status)

            const lineThrough =  checked ? 'text-decoration: line-through' : ''

            tabledata += `
            <div id="myforms" class="d-flex justify-content-between"> 

                <div class="mr-auto p-2" id='checkb' > 
                    
                    <form action="/updataskstatus" class ="editf" method="post" id="${iterator.task_id}st">
                        <div class="form-check">
                            <input type="hidden" name="taskid"  value="${iterator.task_id}">
                            <input type="hidden" name="taskstatus" value="${newStatus}">
                            <input class="form-check-input" type="checkbox" name="taskstatus  id="flexCheckDefault"  onclick='clickStatusBox(${iterator.task_id})' ${checked}>
                        </div>
                    </form> 
                    
                    <h2 style="${lineThrough}">${iterator.task_name} </h2> 

                </div>

                <div class="d-flex justify-content-end" id="datarow">
                    <form action="/edittask" class ="editf" method="post" id="${iterator.task_id}ed"> 
                        <input type="hidden" name="taskid" value="${iterator.task_id}">
                        <input type="hidden" name="taskname" id="${iterator.task_id}edinname" value="">    
                        <button  type="button" class="btn btn-warning btn-sm" id='btndel'  onclick='clickEdit(${iterator.task_id})'> <i class="fa fa-pencil" aria-hidden="true"></i> </button>  
                    </form> 
                
                    <form action="/deletetask" class ="deletef" method="post" id="${iterator.task_id}del">  
                        <input type="hidden" name="taskid"  value="${iterator.task_id}"> 
                        <button  type="button" class="btn btn-danger btn-sm" id='btndel'  onclick='clickDelete(${iterator.task_id})'><i class="fa fa-trash-o"></i></button>  
                    </form>  
                </div>
            </div>`
        }

        table.innerHTML = tabledata 
    }
}

function getObject() {
    const scriptElement = document.getElementById('objsrc');


    if (scriptElement) {
        const objectinString = scriptElement.getAttribute('data-mytaskobject');
        const parsedObjectinString = JSON.parse(objectinString)
        
        return parsedObjectinString
    }

}

function clickDelete(value) {
    // valuetype = number
    const confirmation = window.confirm('apakah anda yakin ingin menghapus data ?')
    if (confirmation) {
        const forms = document.getElementById(String(value)+'del')
        forms.submit()
    }
  }

function clickEdit(value) {
  // valuetype = number
  const confirmation = window.prompt('mau diganti jadi apa?')
  if (confirmation) {
       const forms = document.getElementById(String(value)+'ed')
       
       document.getElementById(String(value)+'edinname').value = String(confirmation)
       forms.submit()
  }
}

const timeCount = () => {
    const dateHtml = document.getElementById('date')
    const tahun = new Date().getFullYear()
    const bulan = new Date().getMonth()
    const hari = new Date().getDay()
    const jam = new Date().getHours()
    const menit = new Date().getMinutes()
    const detik = new Date().getSeconds()

    dateHtml.innerHTML = `${hari}/${bulan}/${tahun} | ${jam}:${menit}:${detik}`
}

function timeUpdate() {
    timeCount()
    
    setInterval(() => {
        timeCount()
    },1000)
}

getStatus = (status) => {
    if (status === 0 ) {
        return ''
    }else {
        return 'checked'
    }
}

getNewStatus = (status) => {
    if (status ===0) {
        return 1
    } else {
        return 0
    }
}

clickStatusBox = (value) => {
    const form = document.getElementById(value+'st')
    form.submit()
    
}

timeUpdate()
loadUserData(getObject(),getStatus,getNewStatus)






