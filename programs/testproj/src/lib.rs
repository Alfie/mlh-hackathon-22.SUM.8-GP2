use anchor_lang::prelude::*;
declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod testproj {

    use super::*;
    pub fn start(ctx: Context<CreatePlayerAccount>, name: String) -> Result<()> {
        let player_stats = &mut ctx.accounts.player_details;
        player_stats.game_score.push("0".to_owned());
        player_stats.game_score.push("0".to_owned());
        player_stats.count_games_played = [0, 0];
        player_stats.games_played.push("2048".to_owned());
        player_stats.games_played.push("Puzzle".to_owned());
        player_stats.player_level = 0;
        player_stats.player_name = name;

        player_stats.bump = *ctx.bumps.get("player_details").unwrap();

        Ok(())
    }
    pub fn change_player_name(ctx: Context<ChangePlayerName>, name: String) -> Result<()> {
        let player_stats = &mut ctx.accounts.user_stats;
        player_stats.player_name = name;

        Ok(())
    }
    pub fn change_game_score(
        ctx: Context<UpdateGameScore>,
        game: String,
        score: String,
    ) -> Result<()> {
        let player_stats = &mut ctx.accounts.user_stats;

        if game == "2048" {
            player_stats.game_score[0] = score
        } else {
            player_stats.game_score[1] = score
        }

        Ok(())
    }

    pub fn change_count_games_played(
        ctx: Context<UpadatePlayerGamePlayed>,
        game: String,
    ) -> Result<()> {
        let player_stats = &mut ctx.accounts.user_stats;
        if game == "2048" {
            player_stats.count_games_played[0] += 1
        } else {
            player_stats.count_games_played[1] += 1
        }
        Ok(())
    }
}

#[account]
pub struct PlayerDetails {
    pub game_score: Vec<String>,
    pub count_games_played: [u64; 2],
    pub games_played: Vec<String>,
    pub player_level: u64,
    pub player_name: String,
    bump: u8,
}

#[derive(Accounts)]
pub struct CreatePlayerAccount<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(init, payer= user, space = 10000, seeds=[b"playerdetails", user.key().as_ref()], bump )]
    pub player_details: Account<'info, PlayerDetails>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ChangePlayerName<'info> {
    pub user: Signer<'info>,
    #[account(mut, seeds=[b"playerdetails", user.key().as_ref()], bump = user_stats.bump)]
    pub user_stats: Account<'info, PlayerDetails>,
}

#[derive(Accounts)]
pub struct UpdateGameScore<'info> {
    pub user: Signer<'info>,
    #[account(mut, seeds=[b"playerdetails", user.key().as_ref()], bump = user_stats.bump)]
    pub user_stats: Account<'info, PlayerDetails>,
}

#[derive(Accounts)]
pub struct UpadatePlayerGamePlayed<'info> {
    pub user: Signer<'info>,
    #[account(mut, seeds=[b"playerdetails", user.key().as_ref()], bump = user_stats.bump)]
    pub user_stats: Account<'info, PlayerDetails>,
}

// #[account]
// pub struct BaseAccount {
//     pub total_count: u64,
//     pub store_links: Vec<Items>,
// }
