import axios from "axios"

class CubeService {

    data = {
        User: null,
    }

    async getCubes(filters) {
        let path;
        if (filters) {
            path = '/api/cubes?' + filters;
        } else {
            path = '/api/cubes'
        }

        const res = await axios(path);
        return res.data;
    }

    async getMyCubes() {
        // todo filter params einbauen
        const res = await axios.get('/api/user/cubes');
        return res.data;
    }

    async getUserCubes(userID) {
        // todo filter params einbauen
        const res = await axios.get('/api/cubes?filter%5Buser_id%5D=' + userID);
        return res.data;

        // url: 'http://specter.test/api/cubes',
        //     params: {'filter[user_id]': '1'},
    }

    async getCube(id) {
        const res = await axios('/api/cubes/' + id);
        // console.log(res.data);
        return res.data;
    }


    async newCube(data) {
        let res = await axios.post('/api/cubes', data)
        return res
    }

    newCubeThumbnail(data) {

        const form = new FormData();
        form.append("thumbnail", "C:\\Users\\simon\\google-drive\\anime\\images\\vergil.jpg");

        const options = {
            method: 'POST',
            url: 'http://specter.test/api/cubes/1/thumbnail',
            headers: {
                cookie: 'remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6IktUdzdWNnlvaXU2U204dXpCdDhqcXc9PSIsInZhbHVlIjoidGpNVDVHSE9qc05PQ2NCTUVrVkF0ZytkaUtESGZJTnhGbUhQcEpudzFiQkhXaUQ4cmlCbDNBS3poSzBiY0laUjA2d05oN3FRYkU1Ung0OTBySDhRTEZFcUVZZnhSM1MwcWNJTmRBSm52Z0FqTjdtejN2d0Y2ODlnMkEzek8rRGJ2VmtOZmErakpiRUgwN25JYVprZFdQYkhFMEIxT0pkMlkyUlFqOHVTVzlVPSIsIm1hYyI6ImViM2M1ZDAyMzZlYjc5ZGMyYWVlM2E3OWJmMmZkOThmZDhhMmVhMTU1N2M2Y2M5NTUwMjBhZjIyYWQxODA3ZmUifQ%253D%253D',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'
            },
            data: '[form]'
        };

        axios.request(options).then(function (response) {
            // console.log(response.data);
            return response.data
        }).catch(function (error) {
            console.error(error);
        });

        //
        // let res = await axios.post('/api/cubes', data)
        //  res
    }

    async newSideMeta(data) {
        // DataFormat: {name: 'new side', position: 4, cube_id: 1}
        let res = await axios.post('/api/sides', data)
        return res
    }
    async editSideMeta(sideID, data) {
        // DataFormat: {name: 'new side', position: 4, cube_id: 1}
        let res = await axios.patch('/api/sides/'+ sideID, data)
        return res
    }

    async view(data) {
        try {
            await axios.post('/api/views', data).then((res) => {
                console.log(res.data);
                return res.data;
            })
        } catch (err) {

        }

    }

    async updateCube(data) {
        await axios.patch('/api/cubes/' + data.id, data).then((res) => {
            console.log(res.data);
            // router.push("/cubes/" + data.id);
            return res.data;
        })
    }

    async deleteCube(data) {
        await axios.delete('/api/cubes/' + data.id, data).then((res) => {
            console.log(res.data);
            // router.push("/cubes/" + data.id);
            return res.data;
        })
    }

    async deleteSide(id) {
        await axios.delete('/api/sides/' + id).then((res) => {
            console.log(res.data);
            // router.push("/cubes/" + data.id);
            return res.data;
        })
    }

    async likeToggleCube(id) {
        let res = await axios.post('/api/likes', {cube_id: id})
        return res
    }

}

export default new CubeService();