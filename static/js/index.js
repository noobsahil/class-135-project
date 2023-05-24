$(document).ready(function(){

    console.log('Document is Ready')

    // Getting the date using Date() object and converting it to a string
    let date = new Date()
    let current_date = date.toDateString()

    // Display the date on the HTML page using jQuery and JS
    $('#date').text('Date: ' + current_date)

    let review = ""
    let input_data = ""
    let product = ""
    let emotion = ""
    let emoji_url = ""

    // Making a function for AJAX request
    function ajax_request(api_url, input_data) {
        $.ajax({
            // Type of request
            type: 'TYPE',

            // URL
            url: api_url,

            // JSON data
            data: JSON.stringify(input_data),

            // Datatype of expected response
            dataType: 'json',

            // Content type
            contentType: 'application/json',

            // Success method
            success: function(result) {
                // Extract the sentiment and emoji path
                emotion = result.sentiment
                emoji_url = result.path

                // Update the emoticon and sentiment accordingly
                if (product == 'Smartphone') {
                    $('#m_emoji').attr('src', emoji_url)
                    $('#m_emotion').text(emotion)
                    $('#m_emoji').show()
                    $('#m_emotion').show()
                } else if (product == 'Digital Camera') {
                    $('#c_emoji').attr('src', emoji_url)
                    $('#c_emotion').text(emotion)
                    $('#c_emoji').show()
                    $('#c_emotion').show()
                } else if (product == 'Headphones') {
                    $('#h_emoji').attr('src', emoji_url)
                    $('#h_emotion').text(emotion)
                    $('#h_emoji').show()
                    $('#h_emotion').show()
                } else if (product == 'Video Games') {
                    $('#v_emoji').attr('src', emoji_url)
                    $('#v_emotion').text(emotion)
                    $('#v_emoji').show()
                    $('#v_emotion').show()
                }
            },

            // Error method
            error: function(result) {
                console.log(result)
            }
        })

        console.log('AJAX request sent')
    }

    // Check if Submit button under 'smartphone' is clicked and get the review accordingly
    $('#m_button').click(function() {
        review = $('#m_textbox').val()
        input_data = {'customer_review': review}
        ajax_request('/predict', input_data)

        product = 'Smartphone'
    })

    // Check if Submit button under 'camera' is clicked and get the review accordingly
    $('#c_button').click(function() {
        review = $('#c_textbox').val()
        input_data = {'customer_review': review}
        ajax_request('/predict', input_data)

        product = 'Digital Camera'
    })

    // Check if Submit button under 'headphones' is clicked and get the review accordingly
    $('#h_button').click(function() {
        review = $('#h_textbox').val()
        input_data = {'customer_review': review}
        ajax_request('/predict', input_data)

        product = 'Headphones'
    })

    // Check if Submit button under 'videogame' is clicked and get the review accordingly
    $('#v_button').click(function() {
        review = $('#v_textbox').val()
        input_data = {'customer_review': review}
        ajax_request('/predict', input_data)

        product = 'Video Games'
    })

    // If SAVE button is clicked, hit a post request on the API
    $('#save_button').click(function() {
        console.log('Save button is clicked')

        // Input data
        input_data = {'date': date, 'product': product, 'review': review, 'sentiment': emotion}

        // AJAX call
        $.ajax({
            type: 'TYPE',
            url: 'API_URL',
            data: JSON.stringify(input_data),
            dataType: 'json',
            contentType: 'application/json',
            success: function(result) {
                console.log(result)
            },
            error: function(result) {
                console.log(result)
            }
        })

        // Clearing textboxes
        $('#m_textbox').val('')
        $('#c_textbox').val('')
        $('#h_textbox').val('')
        $('#v_textbox').val('')
    })
})
