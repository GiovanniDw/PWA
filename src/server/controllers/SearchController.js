import { searchAll } from '../helpers/api.js';

export const SearchController = async (req,res, next) => {
	const query = req.query.q;
	console.log(query)
	try {
		const data = await searchAll(query);
		console.log(data)
		res.render('search', {
			title: 'Search',
			query: query,
			data: data
		})
	} catch (error) {
		next(err)
	}
}
export default SearchController