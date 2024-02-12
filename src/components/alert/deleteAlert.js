import Swal from "sweetalert2";

function DeleteAlert() {
    return (
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        })
            .then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success",
                        timer: 2000,
                    });
                    return true;
                } else {
                    return false;
                }
            })
    );
}

export default DeleteAlert;
