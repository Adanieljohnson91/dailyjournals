const url = 'http://localhost:8088/journalentries'
const API = {
   getJournalEntries(){
        return fetch(url)
            .then(res => res.json())
            .then((res) => {
                return res
            })
    },
    addJournalEntry(data){
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    },
    updatJournalEntry(data, id){
        return fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log('Success', data)
                return data;
            })
    },
    deleteJournalEntry(id){
        return fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log('Delete-Success', res);
            })
            .catch((err) => {
                console.log('Delete-Error', err)
            })
    },
}
export default API;