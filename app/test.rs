
    // pub fn increase_game_score()

    // pub fn make_counter_account(ctx: Context<Start>) -> Result<()> {
    //     let base_account = &mut ctx.accounts.base_account;
    //     base_account.total_count = 0;

    //     Ok(())
    // }
    // pub fn increment(ctx: Context<Incriment>, link: String) -> Result<()> {
    //     let base_account = &mut ctx.accounts.base_account;
    //     let user = &mut ctx.accounts.user;
    //     let item_struct = Items {
    //         link: link.to_string(),
    //         user_address: *user.to_account_info().key,
    //     };
    //     base_account.total_count += 1;
    //     base_account.store_links.push(item_struct);
    //     // msg!(stringify!(account.total_count));
    //     Ok(())
    // }
    // pub fn add_link(ctx: Context<>)
// }

// // #[derive(Accounts)]
// // pub struct Start {}

// #[derive(Accounts)]
// pub struct Start<'info> {
//     #[account(init, payer = user, space = 9000)]
//     pub base_account: Account<'info, BaseAccount>,
//     #[account(mut)]
//     pub user: Signer<'info>,
//     pub system_program: Program<'info, System>,
// }

// #[derive(Accounts)]
// pub struct Incriment<'info> {
//     #[account(mut)]
//     pub base_account: Account<'info, BaseAccount>,
//     #[account(mut)]
//     pub user: Signer<'info>,
// }

// #[derive(Debug, Clone, AnchorDeserialize, AnchorSerialize)]
// pub struct Items {
//     pub link: String,
//     pub user_address: Pubkey,
// }