import { searchAll, searchId } from '../helpers/api.js';

export const CollectionController = async (req,res, next) => {
	// const query = req.query.q;
	// console.log(query)
	try {
		const data = await searchAll('Rembrand');
		res.render('collection', {
			title: 'Collecton',
			query: 'Rembrand',
			data: data
		})
	} catch (error) {
		console.log(error)
		next(error)
	}
}

export const CollectionDetailsController = async (req,res, next) => {
  const id = req.params.id;
	// const query = req.query.q;
	// console.log(query)
	try {
		const data = await searchId(id);
		res.render('details', {
			title: 'Collecton',
			data: data
		})
	} catch (error) {
		console.log(error)
		next(error)
	}
}


export default CollectionController
