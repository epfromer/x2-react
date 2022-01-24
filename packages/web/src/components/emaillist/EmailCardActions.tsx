import {
  getEmail,
  getEmailIndex,
  getNextEmailId,
  getPreviousEmailId,
  store,
} from '@klonzo/common'
import { ArrowBack, ArrowLeft, ArrowRight } from '@mui/icons-material'
import { CardActions, Grid, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

interface Props {
  id: string
}
export default function EmailCardActions({ id }: Props) {
  const navigate = useNavigate()
  const totalEmails = useSelector(getEmail)?.length
  const emailIndex = getEmailIndex(store, id)
  const previousEmailId = getPreviousEmailId(store, id)
  const nextEmailId = getNextEmailId(store, id)

  return (
    <CardActions>
      <Grid container>
        <Grid item>
          <Tooltip title="Back to list">
            <IconButton
              aria-label="back to list"
              data-testid="back-to-list"
              onClick={() => navigate(`/SearchView`)}
            >
              <ArrowBack />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          {totalEmails ? `${emailIndex} of ${totalEmails}` : ''}
          <Tooltip title="Previous email">
            <span>
              <IconButton
                aria-label="previous email"
                data-testid="previous-email"
                disabled={!previousEmailId}
                onClick={() => navigate(`/EmailDetailView/${previousEmailId}`)}
              >
                <ArrowLeft />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Next email">
            <span>
              <IconButton
                aria-label="next email"
                data-testid="next-email"
                disabled={!nextEmailId}
                onClick={() => navigate(`/EmailDetailView/${nextEmailId}`)}
              >
                <ArrowRight />
              </IconButton>
            </span>
          </Tooltip>
        </Grid>
      </Grid>
    </CardActions>
  )
}
