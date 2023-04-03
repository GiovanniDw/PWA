import { searchAll } from '../../helpers/api.js';

export const SearchController = async (req,res, next) => {
	try {
		const query = await req.query.q;
		const data = await searchAll(query);
		console.log(data)
		res.render('search.njk', {
			title: 'Search',
			query: query,
			data: data
		})
	} catch (error) {
		next(err)
	}
}
export default SearchController