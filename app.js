var coursesAPI = 'http://localhost:3000/courses';

function start() {
    getCourses(renderCourses)
    handleCreateForm();
}

//start ứng dụng
 start();

 //functions
 function getCourses(callback) {
    fetch(coursesAPI) 
        .then(function(response) {
            return response.json();
        })
        .then(callback)
}


// Tạo function để C create course
function createCourse(data, callback) {
    var options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(coursesAPI, options) //fetch để tìm và nạp tài nguyên từ một nguồn nào đó
    .then(function(response){
        response.json();
    })
    .then(callback)
}

//function D Delete
function handleDeleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(coursesAPI + '/' + id, options)
    .then(function(response){
        response.json();
    })
    .then(function() {
        getCourses(renderCourses)
        var courseItem = document.querySelector('.course-item-' + course.id)
        if(courseItem) {
            courseItem.remove();
        } else return
    })
}


//API Update
function handleUpdateCourse(data, id, callback) {
    var options = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(coursesAPI + '/' + id, options)
    .then(function(response){
        response.json();
    })
    .then(callback)
}


function handleUpdateForm(id) {
        var buttonUpdate = document.querySelector('#create');
        buttonUpdate.innerHTML = 'Update';
        var course;
        getCourses(function(courses) {
            course = courses.find(function (courseItem)  {
                return courseItem.id == id
            })
        });
        var title = document.querySelector('input[name="title"]');
        var author = document.querySelector('input[name="author"]');
        var description = document.querySelector('input[name="des"]');

        buttonUpdate.onclick = function() {
            var formData = {
                title: title.value,
                author: author.value,
                description: description.value
            }
            handleUpdateCourse(formData, id, function() {
                getCourses(renderCourses);
                document.querySelector('#create').innerHTML = 'Update'
            })
        }
    }


function renderCourses(courses) {//rend ra html, đây chính là callback của hàm getCourse ban đầu
    var listCoursesBlock = document.querySelector('#list-courses');//lấy ra id list-course gán vào biến
    var htmls = courses.map(function(course) //trả về một mảng mới danh sách các course
    {
        return `
        <li class ="course-item-${course.id}">
        <h4>Tên khóa học: ${course.title}</h4>
        <h4>Giảng viên: ${course.author}</h4>
        <p>Mô tả khóa học: ${course.description}</p>
        <button style = "background-color: beige" onclick="handleDeleteCourse(${course.id})">Delete</button>
        <button style = "background-color: aqua" onclick="handleUpdateForm(${course.id})">Update</button>
        </li>
        `
    })
    console.log(courses)
    listCoursesBlock.innerHTML = htmls.join('')//Nếu ko có cặp '' thì sẽ mặc định nối với nhau bằng dấu phẩy
}


function handleCreateForm() {//viết logic tạo mới dl
    var createBtn = document.querySelector('#create')

    createBtn.onclick = function () {
        var title = document.querySelector('input[name="title"]').value;
        var author = document.querySelector('input[name="author"]').value;
        var description = document.querySelector('input[name="des"]').value;
        var formData = {
            title: title,
            author: author,
            description: description
        }
        createCourse(formData, function() {//sau khi create xong thì ta gọi luôn getcourses để render ra html luôn, ko cần tải lại trang
            getCourses(renderCourses)
        });
    }
}