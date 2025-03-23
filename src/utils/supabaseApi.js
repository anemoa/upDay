import axios from "axios";
import { BiErrorAlt } from "react-icons/bi";

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
			console.error('API error: ', error);
			throw error;
			
		}
	},

	// email로 id 사용자 id 조회 함수
	async getUserIdByEmail(email){
		try{
			const response = await axios.get(
				`${supabaseUrl}/rest/v1/users?email=eq.${encodeURIComponent(email)}&select=id`,
				{headers}
			);
			return response.data[0]?.id;
		}catch (error){
			console.error('API error: ', error);
			console.log('test');
			
			throw error;
		}
	},
	

	// 생성(create)
	async post(table, data){
		try{
			const response = await axios.post(
				`${supabaseUrl}/rest/v1/${table}`,
				data,
				{headers}
			);
			return response.data;
		} catch(error){
			console.error('API error: ', error);
			throw error;
		}
	}
}