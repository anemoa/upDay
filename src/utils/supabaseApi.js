import axios from "axios";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;



const headers = {
	apikey: supabaseKey,
	Authorization: `Bearer ${supabaseKey}`,
	'Content-Type': 'application/json'
};


export const supabaseApi = {
	// 조회(read)
	async get(table, query = '*') {
		try{
			const response = await axios.get(
				`${supabaseUrl}/rest/v1/${table}?select=${query}`,
				{headers}
			);
			return response.data;
		} catch(error){
			console.error('API error', error);
			throw error;
			
		}
	}
}