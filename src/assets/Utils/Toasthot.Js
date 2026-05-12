import toast from "react-hot-toast";



export const Toast = {
    success: function (message, time = 2000, color = 'white', background = '#333') {

        return (
            toast.success(message, {
                style: {
                    border: "1px solid white",
                    background: background,
                    color: color,
                    padding: "20px",
                    width: "300px",
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
                duration: time,
            })
        )

    },

    error: (message, time = 3000, color = 'white', background = '#333') => {
        toast.error(message, {
            style: {
                border: "1px solid white",
                background: background,
                color: color,
                padding: "20px",
                width: "300px",
            },
            iconTheme: {
                primary: '#713200',
                secondary: '#FFFAEE',
            },
            duration: time,
        })
    },

}


