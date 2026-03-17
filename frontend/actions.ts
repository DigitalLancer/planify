"use server"

export async function submitEventForm(formData: FormData) {
    const data = {
        title: formData.get("title"),
        category: formData.get("category"),
        startDate: formData.get("startDate"),
        description: formData.get("description")
    };

    try {
        const response = await fetch("http://localhost:5278/api/Event", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log("Success!");
        }
    } catch (error) {
        console.error("Error posting form", error);
    }
}