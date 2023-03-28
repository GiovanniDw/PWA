import express from 'express';
import { searchAll, getMuseumDataByMaker } from '../helpers/api.js';

const apiKey = 'S3GLzVAr';
const URL = `https://www.rijksmuseum.nl/api/en/collection?key=${apiKey}&imgonly=true`;

// const thisUser = req.user;
// 	let users = [];
	
// 	try {
// 		artwork = await matchHelper.users(thisUser);
// 		if (req.user) {
// 			res.render('pages/index', {
// 				title: 'Discover',
// 				user: req.user,
// 				users: users
// 			});
// 		} else {
// 			res.redirect('/error');
// 		}
// 	} catch (err) {
// 		next(err);
// 	}
export const HomeController = async (req,res, next) => {
	
	try {
		const rembrand = await getMuseumDataByMaker('Rembrandt+van+Rijn');
		const Johannes = await await getMuseumDataByMaker('Johannes+Vermeer')
		console.log(rembrand)
		res.render('index', {
			title: 'home',
			makers: [{
				name: 'Rembrand',
				data: rembrand
			},{
				name: 'Johannes Vermeer',
				data: Johannes
			},
		]
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
};





export const users = async (req, res, next) => {
	const thisUser = req.user;
	let users = [];
	
	try {
		users = await matchHelper.users(thisUser);
		if (req.user) {
			res.render('pages/index', {
				title: 'RijksMuseum',
				user: req.user,
				users: users
			});
		} else {
			res.redirect('/login');
		}
	} catch (err) {
		next(err);
	}
};

export default HomeController;