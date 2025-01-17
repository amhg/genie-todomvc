$(function() {
    $('input[type="checkbox"]').on('change', function() {
      if (this.checked) {
        $(this).siblings("label").addClass('completed');
      } else {
        $(this).siblings("label").removeClass('completed');
      }
    });
  });

  
  $(function() {
    $('input[type="checkbox"]').on('change', function() {
      axios({
        method: 'post',
        url: '/todos/' + $(this).attr('value') + '/toggle',
        data: {}
      })
      .then(function(response) {
       // $('#todo_' + response.data.todo.id.value).first().checked = response.data.//todo.completed;
        console.log(response);
      });
    });
  });
  
$(function() {
    $('li > label').on('dblclick', function() {
        $(this).attr('contenteditable', true);
    });
    $('li > label').on('keyup', function(event) {
        if(event.keyCode === 13) { // Code to run if the enter key was pressed
          console.log("This html: " + $(this).html())
            $(this).removeAttr('contenteditable');
            axios({
                method: 'post',
                url: '/todos/' + $(this).data('todo-id') + '/update',
                data: { todo: $(this).html() }
            })
            .then(function(response) {
                $('label[data-todo-id="' + response.data.id.value + '"]').first().html(response.data.todo);
                console.log($('label[data-todo-id="' + response.data.id.value + '"]').first().html(response.data.todo))
            });
        } else if (event.keyCode === 27) { //Esc key was pressed
            $(this).removeAttr('contenteditable');
            $(this).text($(this).attr('data-original'));
        }
    })
})

$(function() {
  $('li').on('mouseenter', function() {
    $(this).children('button').removeClass('invisible');
  });
  $('li').on('mouseleave', function() {
    $(this).children('button').addClass('invisible');
  });
  $('li > button').on('click', function() {
    if(confirm("Are you sure you want to delete this todo?")) {
      axios({
        method: 'post',
        url: '/todos/' + $(this).attr('value') + '/delete', 
        data: {}
      })
      .then(function(response) {
        console.log($('#todo_' + response.data.id.value))

        $('#todo_' + response.data.id.value)
        .first()
        .parent()
        .remove();
      });

    }
  })
})

