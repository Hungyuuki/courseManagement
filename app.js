

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
    fetch(coursesAPI, options)
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

function updateCourse(id, data, callback) {
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


function handleUpdateCourses(id) {
        var buttonUpdate = document.querySelector('#create');
        buttonUpdate.innerHTML = 'Update';
        var course;
        getCourses(function(course) {
            course = courses.find((courseItem) => courseItem.id == id)
        });
        var title = document.querySelector('input[name="title"]');
        var author = document.querySelector('input[name="author"]');
        title.value = course.title;
        author.value = course.author;
        buttonUpdate.onclick = function() {
            var formData = {
                title: title.value,
                author: author.value
            }
            handleCreateForm(formData, id, function() {
                getCourses(renderCourses);
                document.querySelector('#create').innerHTML = 'Create'
            })
        }
    }


function renderCourses(courses) {//rend ra html
    var listCoursesBlock = document.querySelector('#list-courses');//lấy ra id list-course gán vào biến
    var html = courses.map(function(course) //trả về một mảng mới
    {
        return `
        <li class ="course-item-${course.id}">
        <h4>${course.title}</h4>
        <h4>${course.author}</h4>
        <button style = "background-color: beige" onclick="handleDeleteCourse(${course.id})">Delete</button>
        <button style = "background-color: aqua" onclick="handleDeleteCourse(${course.id})">Update</button>
        </li>
        `
    })
    listCoursesBlock.innerHTML = html.join('') //join các khóa lại với nhau
}


function handleCreateForm() {//viết logic tạo mới dl
    var createBtn = document.querySelector('#create')

    createBtn.onclick = function () {
        var title = document.querySelector('input[name="title"]').value;
        var author = document.querySelector('input[name="author"]').value;
        var formData = {
            title: title,
            author: author
        }
        createCourse(formData, function() {//sau khi create xong thì ta gọi luôn getcourses để render ra html luôn, ko cần tải lại trang
            getCourses(renderCourses)
        });
    }
}