import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "brain-rot-player" is now active!');

	const disposable = vscode.commands.registerCommand('brain-rot-player.brainrot', async () => {
		const options = ['Subway Surfer', 'Minecraft parkour', 'Family Guy', 'Grand Theft Auto V Car', 'Subway Surfers Game'];
		const videoUrls: { [key: string]: string } = {
			'Subway Surfer': 'https://0xcc.fi/b/brainrot/subwaysurfers.mp4',
			'Minecraft parkour': 'https://0xcc.fi/b/brainrot/minecraft.mp4',
			'Family Guy': 'https://0xcc.fi/b/brainrot/familyguy.mp4',
			'Grand Theft Auto V Car': 'https://0xcc.fi/b/brainrot/gtav.mp4',
			'Subway Surfers Game': 'https://ly4fsf.csb.app/',
		};

		const selected = await vscode.window.showQuickPick(options, {
			placeHolder: 'Select your brainrot',
		});

		if (selected) {
			const videoUrl = videoUrls[selected];
			if (!videoUrl || videoUrl === 'REPLACE_WITH_URL') {
				vscode.window.showInformationMessage(
					`Video URL missing for selection: ${selected}. :(`
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

			const playerHtmlPath = path.join(context.extensionPath, 'out', 'player.html');
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
