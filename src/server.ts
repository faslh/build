
		import application from './main';
		const host = process.env['HOST'] ?? '0.0.0.0';
		const port = parseInt(process.env['PORT'] as string) || 8080;
		application.listen(port, host);
		console.log(`http://${host}:${port}`);
			