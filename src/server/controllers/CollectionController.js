import { searchAll, searchId } from '../helpers/api.js';

export const CollectionController = async (req,res) => {
	// const query = req.query.q;
	// console.log(query)
	try {
		const data = await searchAll('Rembrand');
		res.render('collection', {
			title: 'Collecton',
			query: 'Rembrand',
			data: data.artObjects
		})
	} catch (error) {
		console.log(error)
	}
}

export const CollectionDetailsController = async (req,res) => {
  const id = req.params.id;
	// const query = req.query.q;
	// console.log(query)
	try {
		const data = await searchId(id);
		console.log(req.params)
		res.render('details', {
			title: 'Collecton',
			data: data.artObject
		})
	} catch (error) {
		console.log(error)
	}
}


export default CollectionController
