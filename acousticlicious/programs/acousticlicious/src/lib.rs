use anchor_lang::prelude::*;

declare_id!("4hvwMTDXN27NvQbSqXt53CSFa1N2KPkK7JR3q9WVoPuF");

#[program]
pub mod acousticlicious {
  use super::*;

  pub fn initialize_base_account(ctx: Context<Initialize>) -> Result <()> {
    let base_account = &mut ctx.accounts.base_account;
    base_account.total_music = 0;
    Ok(())
  }

  pub fn add_music(ctx: Context<AddMusic>, video_id: String, thumbnail_link: String, title: String, channel_title: String) -> Result <()> {
    let base_account = &mut ctx.accounts.base_account;
    let user = &mut ctx.accounts.user;

    let item = ItemStruct {
      video_id: video_id.to_string(),
      thumbnail_link: thumbnail_link.to_string(),
      title: title.to_string(),
      channel_title: channel_title.to_string(),
      user_address: *user.to_account_info().key,
    };
		
    base_account.music_list.push(item);
    base_account.total_music += 1;
    Ok(())
  }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
  #[account(init, payer = user, space = 9000)]
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
  pub system_program: Program <'info, System>,
}

// Add the signer who calls the AddMusic method to the struct so that we can save it
#[derive(Accounts)]
pub struct AddMusic<'info> {
  #[account(mut)]
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
}

// Create a custom struct for us to work with.
#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ItemStruct {
    pub video_id: String,
    pub thumbnail_link: String,
    pub title: String,
    pub channel_title: String,
    pub user_address: Pubkey,
}

#[account]
pub struct BaseAccount {
    pub total_music: u64,
	// Attach a Vector of type ItemStruct to the account.
    pub music_list: Vec<ItemStruct>,
}