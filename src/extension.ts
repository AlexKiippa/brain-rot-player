import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "brain-rot-player" is now active!');

	const disposable = vscode.commands.registerCommand('brain-rot-player.brainrot', async () => {
		const options = ['Subway Surfer', 'Minecraft parkour', 'Family Guy', 'Subway Surfers Game'];
		const videoUrls: { [key: string]: string } = {
			'Subway Surfer':
				'https://d2h58dsjpbzmve.cloudfront.net/5csxi%2Ffile%2F94140f46bae185d7a6367a7c8fb8f19f_f1afdfc2695dd005086c509b7f01d75d.mp4?response-content-disposition=inline%3Bfilename%3D%2294140f46bae185d7a6367a7c8fb8f19f_f1afdfc2695dd005086c509b7f01d75d.mp4%22%3B&response-content-type=video%2Fmp4&Expires=1769541073&Signature=IwnulSKE2pm3yx~xjqC37otrlEzCWyZMf9K8dvn2TJc5YieTZgi7yFxQabvc7GHgJkBj70QIac1v~PtyXcCRsVoEfNg9UOzOq6Uh~AKm~3x8EnmITNamvPuDxZ7OOSpafnCqLW27ZxI7geecn2TJhxaEyjQHIq8TU4U8--4oUGzq9RFQAzDWXLvA9-r9spYlM1hWERTdnMUzZND3jkX3LhC1eoqx9zSqisB1IxUUIr9uE-cor-vWizg0FHJWoW8jZdyXRyeazzAnlKnL~C1ODpmbNFQEdjtEiTjEUt~w0iPqQ~gANYwGONqphC3qYZH1cCWmqEk-c7RV2sTwBNyPVw__&Key-Pair-Id=APKAJT5WQLLEOADKLHBQ',
			'Minecraft parkour': 'REPLACE_WITH_URL',
			'Family Guy': 'REPLACE_WITH_URL',
			'Subway Surfers Game': 'https://ly4fsf.csb.app/',
		};

		const selected = await vscode.window.showQuickPick(options, {
			placeHolder: 'Select your brainrot',
		});

		if (selected) {
			const videoUrl = videoUrls[selected];
			if (!videoUrl || videoUrl === 'REPLACE_WITH_URL') {
				vscode.window.showInformationMessage(
					`No video URL set for "${selected}". Update videoUrls in src/extension.ts.`
				);
				return;
			}

			const panel = vscode.window.createWebviewPanel(
				'brainRotPlayer',
				`Playing: ${selected}`,
				vscode.ViewColumn.Beside,
				{
					enableScripts: true,
				}
			);

			const playerHtmlPath = path.join(context.extensionPath, 'media', 'player.html');
			let playerHtml = fs.readFileSync(playerHtmlPath, 'utf8');

			let playerContent = '';
			if (selected === 'Subway Surfers Game') {
				playerContent = `<iframe id="game-iframe" src="${videoUrl}" style="border:none;" allowfullscreen></iframe>`;
			} else {
				playerContent = `<video id="video-player" src="${videoUrl}" autoplay muted controls playsinline preload="auto"></video>`;
			}

			playerHtml = playerHtml.replace('{{PLAYER}}', playerContent);
			playerHtml = playerHtml.replace(/{{CSP_SOURCE}}/g, panel.webview.cspSource);

			panel.webview.html = playerHtml;
		} else {
			vscode.window.showInformationMessage('No option selected');
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
