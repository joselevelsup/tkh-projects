import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => {
    return axios.get(url).then(response => response.data);
}

export default function UsingUseSWR(){
    const { data, error, isLoading } = useSWR("https://pokeapi.co/api/v2/pokemon/ditto", fetcher);

    if(isLoading && !error){
        return (
            <div>There is data being loaded</div>
        )
    }

    if(!isLoading && error){
        return (
            <div>There was an error</div>
        )
    }

    return (
        <div>
            {JSON.stringify(data, null, 2)}
        </div>
    )
}