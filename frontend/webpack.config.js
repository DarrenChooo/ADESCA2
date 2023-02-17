const { ProvidePlugin } = require('webpack');
const path = require('path');

module.exports = {
    entry: {

        // Admin Pages
        ManageImages: './react/output/ManageImages.js',
        ManageNpcs: './react/output/ManageNpcs.js',
        ManageItems: './react/output/ManageItems.js',
        ManageBoss: './react/output/ManageBoss.js',
        ManageFloors: './react/output/ManageFloors.js',
        ManageCurrency: './react/output/ManageCurrency.js',
        UpdateImage: './react/output/UpdateImage.js',
        UpdateCurrency: './react/output/UpdateCurrency.js',
        UpdateItem: './react/output/UpdateItem.js',
        UpdateFloors: './react/output/UpdateFloors.js',
        AddImage: './react/output/AddImage.js',
        AddItem: './react/output/AddItem.js',
        AddFloors: './react/output/AddFloors.js',
        ViewNpc: './react/output/ViewNpc.js',
        AddNpc: './react/output/AddNpc.js',
        UpdateNpc: './react/output/UpdateNpc.js',
        DeleteNpc: './react/output/DeleteNpc.js',
        ManageDialogues: './react/output/ManageDialogues.js',
        ViewDialogue: './react/output/ViewDialogue.js',
        AddDialogue: './react/output/AddDialogue.js',
        UpdateDialogue: './react/output/UpdateDialogue.js',
        DeleteDialogue: './react/output/DeleteDialogue.js',
        ManagePosts: './react/output/ManagePosts.js',
        Updatepost: './react/output/UpdatePost.js',
        TrackEquippedItems: './react/output/TrackEquippedItems.js',

        // User Pages
        Store: './react/output/Store.js',
        StoreItem: './react/output/StoreItem.js',
        TicTacToeGame: './react/output/TicTacToeGame.js',
        DialogueInteraction: './react/output/DialogueInteraction.js',
        EquipItem: './react/output/EquipItem.js',
        Inventory: './react/output/Inventory.js',
        InventoryItem: './react/output/InventoryItem.js',
        AddPost: './react/output/AddPost.js',
        Floor: './react/output/Floors.js',
        Hangman: './react/output/Hangman.js',
        ViewPlayers: './react/output/ViewPlayers.js',
        ViewFriends: './react/output/ViewFriends.js',
        ViewRequests: './react/output/ViewRequests.js',
        ViewBlocked: './react/output/ViewBlocked.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './public/react'), // Output to ./public/react
    },
    mode: 'development',
    watch: true,
    plugins: [
        // Automatically import react
        new ProvidePlugin({
            React: 'react',
        }),
    ],
};

