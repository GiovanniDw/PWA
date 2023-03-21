import { searchAll } from '../helpers/api.js';

export const SearchController = async (req,res) => {
	const query = req.query.q;
	console.log(query)
	try {
		const data = await searchAll(query);
		console.log(data)
		res.render('search', {
			title: 'Search',
			query: query,
			data: data.artObjects
		})
	} catch (error) {
		console.log(error)
	}
}
export default SearchController